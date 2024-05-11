import { makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import channelApi from '@/features/channels/api';
import { Channel, ChannelSubscription, CreateChannel, UpdateChannel } from '../types';
import { ChannelUserCount } from '@/features/channels/types/channelUserCount';
import { ConnectionSide } from '../enums/connectionSide';
import { nodeDimensions } from '@/features/nodemap/utils/nodeDimensions';
import { Coordinates } from '@/features/nodemap/types/coordinates';
import { CompletionStatus } from '../enums/completionStatus';

dayjs.extend(utc);
dayjs.extend(timezone);

const nodeWidth = nodeDimensions.width;
const nodeHeight = nodeDimensions.height;

type BoundingBox = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

interface ChannelTreeNode {
  channel: Channel;
  children: ChannelTreeNode[];
}

export class ChannelStore {
  channels: Channel[] = [];
  currentChannelId: string | undefined;
  channelUserIds: string[] = [];
  isLoading = true;
  userChannelData: ChannelSubscription[] = [];
  channelUserCounts: ChannelUserCount[] = [];
  focusedNodeId: string | null = null;
  draggingNodeId: string | null = null;
  hoverOffset: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  // Computed Values
  get channelTree() {
    const channelMap = new Map<string, ChannelTreeNode>();
    const channelTree: ChannelTreeNode[] = [];
    // Constructing the channelTree
    this.channels.forEach((channel) => {
      channelMap.set(channel.uuid, { channel, children: [] });
    });
    this.channels.forEach((channel) => {
      const parentChannelId = channel.parentChannelId;
      const currentChannelNode = channelMap.get(channel.uuid);
      if (parentChannelId) {
        const parentChannelNode = channelMap.get(parentChannelId);
        if (parentChannelNode && currentChannelNode) {
          parentChannelNode.children.push(currentChannelNode);
        }
      } else if (currentChannelNode) {
        channelTree.push(currentChannelNode);
      }
    });

    return channelTree;
  }

  // Todo: computed value happens when the chatroom is entered. However, does not
  // occur when the join channel button is clicked.
  get currentChannel(): Channel | undefined {
    const channel = this.channels.find((channel) => channel.uuid === this.currentChannelId);

    return channel;
  }

  get defaultChannel(): Channel | undefined {
    const channel = this.channels.find((channel) => channel.isDefault);

    if (channel) {
      return channel;
    }
  }

  get getChannelByUuid() {
    return (uuid: string) => {
      return this.channels.find((channel) => channel.uuid === uuid);
    };
  }

  get channelStats() {
    const stats = this.userChannelData.reduce(
      (
        acc: {
          [CompletionStatus.Complete]: number;
          [CompletionStatus.OnHold]: number;
          [CompletionStatus.InProgress]: number;
          [CompletionStatus.Skip]: number;
        },
        channel,
      ) => {
        acc[channel.status] = (acc[channel.status] || 0) + 1;
        return acc;
      },
      {
        [CompletionStatus.Complete]: 0,
        [CompletionStatus.OnHold]: 0,
        [CompletionStatus.InProgress]: 0,
        [CompletionStatus.Skip]: 0,
      },
    );

    return stats;
  }

  get completionPercentage() {
    const totalChannelCount = this.channels.length;
    const channelsCompleteCount = this.channelStats[CompletionStatus.Complete];
    const percentage = Math.round((channelsCompleteCount / totalChannelCount) * 100);
    return percentage;
  }

  get nodesDragging() {
    const descendants: Channel[] = [];
    if (!this.draggingNodeId) return descendants;
    const rootNode = this.findNode(this.draggingNodeId);
    if (rootNode) {
      descendants.push(rootNode?.channel);
      this.collectDescendants(rootNode, descendants);
    }
    return descendants;
  }

  get draggedNodesWithOffset() {
    return this.nodesDragging.map((node) => ({
      ...node,
      x: node.x + this.hoverOffset.x,
      y: node.y + this.hoverOffset.y,
    }));
  }

  get boundingBox() {
    if (!this.draggingNodeId) return;

    if (this.draggedNodesWithOffset.length === 0) {
      return undefined; // Or some default bounding box if preferred.
    }

    const initialNode = this.draggedNodesWithOffset[0];
    const initialBox = {
      left: initialNode.x,
      right: initialNode.x,
      top: initialNode.y,
      bottom: initialNode.y,
    };

    const boundingBox = this.draggedNodesWithOffset.reduce((acc, curr) => {
      acc.left = Math.min(acc.left, curr.x);
      acc.right = Math.max(acc.right, curr.x);
      acc.top = Math.min(acc.top, curr.y);
      acc.bottom = Math.max(acc.bottom, curr.y);
      return acc;
    }, initialBox);

    const finalBoundingBox = {
      left: boundingBox.left,
      right: boundingBox.right + nodeDimensions.width,
      top: boundingBox.top,
      bottom: boundingBox.bottom + nodeDimensions.height,
    };

    return finalBoundingBox;
  }

  get draggedNodeBoundingBox() {
    if (!this.draggingNodeId) return;

    const draggedChannel = this.findChannelByUuid(this.draggingNodeId);

    if (!draggedChannel) return;

    return {
      left: draggedChannel.x,
      right: draggedChannel.x + nodeWidth,
      top: draggedChannel.y,
      bottom: draggedChannel.y + nodeHeight,
    };
  }

  // Assume nodeDimensions are known for all nodes

  // Function to check if two boxes overlap
  isColliding(box1: BoundingBox, box2: BoundingBox) {
    return (
      box1.left < box2.right &&
      box1.right > box2.left &&
      box1.top < box2.bottom &&
      box1.bottom > box2.top
    );
  }

  isOverlapping(coordinates: Coordinates, box: BoundingBox) {
    return (
      coordinates.x > box.left &&
      coordinates.x < box.right &&
      coordinates.y > box.top &&
      coordinates.y < box.bottom
    );
  }

  async findCollidingStaticNode() {
    if (!this.draggingNodeId) return;
    const draggedNode = this.findChannelByUuid(this.draggingNodeId);
    if (!draggedNode) return;
    const coordinates = {
      name: draggedNode.name,
      x: draggedNode.x + this.hoverOffset.x,
      y: draggedNode.y + this.hoverOffset.y,
    };

    const staticNodes = this.channels.filter((node) => node.uuid !== draggedNode.uuid);

    for (const node of staticNodes) {
      const nodeBox = {
        left: node.x,
        right: node.x + nodeWidth,
        top: node.y,
        bottom: node.y + nodeHeight,
      };

      if (this.isOverlapping(coordinates, nodeBox)) {
        const channelCoordinates = this.getUpdatedChannelPosition(node.uuid, ConnectionSide.RIGHT);

        const channels = await channelApi.moveChannel(
          draggedNode.uuid,
          {
            x: channelCoordinates?.x,
            y: channelCoordinates?.y,
          },
          node.uuid,
        );

        for (const channel of channels) {
          this.updateSubscribedChannel(channel);
        }

        return `Assigned to ${node.name}!`;
      } else {
        continue;
      }
    }
  }

  // Compute the bounding box against static nodes
  findCollisionFreePosition() {
    if (!this.boundingBox) return { x: 0, y: 0 };
    const staticNodes = this.channels.filter(
      (node) => !this.draggedNodesWithOffset.some((draggedNode) => draggedNode.uuid === node.uuid),
    );

    for (const node of staticNodes) {
      const nodeBox = {
        left: node.x,
        right: node.x + nodeWidth,
        top: node.y,
        bottom: node.y + nodeHeight,
      };

      if (this.isColliding(this.boundingBox, nodeBox)) {
        // Collision detected, find new position
        return this.adjustPosition(this.boundingBox, staticNodes);
      }
    }

    // No collision, return original position
    return { x: 0, y: 0 };
  }

  // Adjust the position of the bounding box to avoid collision
  adjustPosition(boundingBox: BoundingBox, staticNodes: Channel[]) {
    // Try shifting the bounding box in different directions
    // This is a simple example and might need more sophisticated logic based on your layout and requirements
    const directions = [
      { x: 160, y: 0 },
      { x: -160, y: 0 },
      { x: 0, y: 80 },
      { x: 0, y: -80 },
    ];

    for (const dir of directions) {
      const adjustedBox = {
        left: boundingBox.left + dir.x,
        right: boundingBox.right + dir.x,
        top: boundingBox.top + dir.y,
        bottom: boundingBox.bottom + dir.y,
      };

      let collision = false;
      for (const node of staticNodes) {
        const nodeBox = {
          left: node.x,
          right: node.x + nodeWidth,
          top: node.y,
          bottom: node.y + nodeHeight,
        };

        if (this.isColliding(adjustedBox, nodeBox)) {
          collision = true;
          break;
        }
      }

      if (!collision) {
        return dir; // Found a collision-free adjustment
      }
    }

    return { x: 0, y: 0 }; // If all directions collide, may need more complex logic
  }

  // Setters
  setFocusedNodeId(focusedNodeId: string | null) {
    this.focusedNodeId = focusedNodeId;
  }

  setHoverOffset = (hoverOffset: { x: number; y: number }) => {
    this.hoverOffset = hoverOffset;
  };

  setDraggingNodeId(draggingNodeId: string | null) {
    this.draggingNodeId = draggingNodeId;
  }

  filterTempChannels = () => {
    this.channels = this.channels.filter((el: Channel) => !el.isTemp);
  };

  setSubscribedChannels = (channels: Channel[]) => {
    this.channels = channels;
  };

  setCurrentChannelUuid = (channelUuid: string | undefined) => {
    this.currentChannelId = channelUuid;
  };

  setDefaultChannelAsCurrentChannelId = () => {
    const defaultChannel = this.defaultChannel;

    if (!defaultChannel) return;

    this.setCurrentChannelUuid(defaultChannel.uuid);
  };

  setChannelUserIds = (channelUserIds: string[]) => {
    this.channelUserIds = channelUserIds;
  };

  setUserChannelData = (userChannels: ChannelSubscription[]) => {
    this.userChannelData = userChannels;
  };

  // Getters
  findNodeConnections(channelCoordinates: Coordinates, parentChannelId?: string) {
    const connectionSides = [];
    if (parentChannelId) {
      const parentChannel = this.findChannelByUuid(parentChannelId);
      if (!parentChannel) return;
      const parentChannelCoordinates = { x: parentChannel.x, y: parentChannel.y };

      if (parentChannelCoordinates.x < channelCoordinates.x) {
        connectionSides.push(ConnectionSide.RIGHT);
      } else {
        connectionSides.push(ConnectionSide.LEFT);
      }
    } else {
      connectionSides.push(ConnectionSide.LEFT);
      connectionSides.push(ConnectionSide.RIGHT);
    }
    return connectionSides;
  }

  findDirectDescendants(channelId: string) {
    const rootNode = this.findNodeRecursive(this.channelTree, channelId);
    return rootNode?.children;
  }

  isNodeDescendant(targetId: string): boolean {
    return this.nodesDragging.some((val) => val.uuid === targetId);
  }

  findNode(nodeId: string): ChannelTreeNode | undefined {
    // Start the recursive search from the root nodes
    return this.findNodeRecursive(this.channelTree, nodeId);
  }

  findChannelByUuid = (uuid: string) => {
    return this.channels.find((channel: Channel) => channel.uuid === uuid);
  };

  findTempChannel = () => {
    return this.channels.find((el: Channel) => el.isTemp);
  };

  findChannelUserCount = (channelUuid: string) => {
    return this.channelUserCounts.find((el: ChannelUserCount) => el.channelUuid === channelUuid);
  };

  findUserChannelDataByChannelId = (channelId: string) => {
    const channelData = this.userChannelData.find(
      (el: ChannelSubscription) => el.channelId === channelId,
    );
    return channelData;
  };

  // Utils
  private findNodeRecursive(nodes: ChannelTreeNode[], nodeId: string): ChannelTreeNode | undefined {
    for (const node of nodes) {
      if (node.channel.uuid === nodeId) {
        return node;
      }
      const foundNode = this.findNodeRecursive(node.children, nodeId);
      if (foundNode) {
        return foundNode;
      }
    }
    return undefined;
  }

  collectDescendants(node: ChannelTreeNode, descendants: Channel[]) {
    for (const child of node.children) {
      descendants.push(child.channel);
      this.collectDescendants(child, descendants);
    }
  }

  isDescendant = (channelId: string, targetChannelId: string): boolean => {
    // Find the root node based on channelId
    const rootNode = this.findNodeInTree(this.channelTree, channelId);
    if (!rootNode) return false;

    return this.hasDescendant(rootNode, targetChannelId);
  };

  private findNodeInTree(nodes: ChannelTreeNode[], channelId: string): ChannelTreeNode | undefined {
    for (const node of nodes) {
      if (node.channel.uuid === channelId) {
        return node;
      }
      const result = this.findNodeInTree(node.children, channelId);
      if (result) return result;
    }
    return undefined;
  }

  private hasDescendant(node: ChannelTreeNode, targetChannelId: string): boolean {
    if (node.channel.uuid === targetChannelId) {
      return true;
    }
    for (const child of node.children) {
      if (this.hasDescendant(child, targetChannelId)) {
        return true;
      }
    }
    return false;
  }

  getUpdatedChannelPosition(channelId: string, connectionSide: ConnectionSide) {
    const nodeXGap = 160;
    const nodeYGap = 40;
    const parentChannel = this.findChannelByUuid(channelId);
    if (!parentChannel) return;
    const childChannels = this.findDirectDescendants(channelId);
    const newChannel: CreateChannel = { name: '', parentChannelId: parentChannel.uuid };
    if (childChannels?.length) {
      const nodeWithHighestY = childChannels.reduce((highest, current) => {
        return current.channel.y > highest.channel.y ? current : highest;
      });
      // Assign y coordinate
      newChannel.y = nodeWithHighestY.channel.y + nodeDimensions.height + nodeYGap;
      newChannel.x = nodeWithHighestY.channel.x;
    } else {
      newChannel.y = parentChannel.y;
      // Assign x coordinate
      if (connectionSide === ConnectionSide.RIGHT) {
        newChannel.x = parentChannel.x + nodeXGap + nodeDimensions.width;
      } else if (connectionSide === ConnectionSide.LEFT) {
        newChannel.x = parentChannel.x - nodeXGap - nodeDimensions.width;
      }
    }

    return newChannel;
  }

  // Create
  handleCreateNode = (channelId: string, workspaceId: string, connectionSide: ConnectionSide) => {
    return async (name: string) => {
      // const parentChannel = this.findChannelByUuid(channelId);
      // if (!parentChannel) return;
      // const childChannels = this.findDirectDescendants(channelId);
      // const newChannel: CreateChannel = { name, parentChannelId: parentChannel.uuid };
      // if (childChannels?.length) {
      //   const nodeWithHighestY = childChannels.reduce((highest, current) => {
      //     return current.channel.y > highest.channel.y ? current : highest;
      //   });
      //   // Assign y coordinate
      //   newChannel.y = nodeWithHighestY.channel.y + nodeDimensions.height + nodeYGap;
      //   newChannel.x = nodeWithHighestY.channel.x;
      // } else {
      //   newChannel.y = parentChannel.y;
      //   // Assign x coordinate
      //   if (connectionSide === ConnectionSide.RIGHT) {
      //     newChannel.x = parentChannel.x + nodeXGap + nodeDimensions.width;
      //   } else if (connectionSide === ConnectionSide.LEFT) {
      //     newChannel.x = parentChannel.x - nodeXGap - nodeDimensions.width;
      //   }
      // }

      const newChannel = this.getUpdatedChannelPosition(channelId, connectionSide);
      if (!newChannel) return;
      newChannel.name = name;

      await this.createChannelApi(newChannel, undefined, workspaceId);
    };
  };

  addChannelUserCounts = (channelUserCounts: ChannelUserCount[]) => {
    this.channelUserCounts.push(...channelUserCounts);
  };

  addChannelUserCount = (channelUserCounts: ChannelUserCount) => {
    this.channelUserCounts.push(channelUserCounts);
  };

  addUserChannelData = (userData: ChannelSubscription) => {
    this.userChannelData.push(userData);
  };

  addSubscribedChannel = (channel: Channel) => {
    if (this.findChannelByUuid(channel.uuid)) return;
    this.channels.push(channel);
  };

  // Update
  updateSubscribedChannel = (updatedChannel: Partial<Channel>) => {
    const channelFound = this.channels.find((channel) => channel.uuid === updatedChannel.uuid);
    if (!channelFound) return;
    Object.assign(channelFound, updatedChannel);
  };

  updateChannelUserCount = (channelUserCount: ChannelUserCount) => {
    const channelUserCountFound = this.findChannelUserCount(channelUserCount.channelUuid);
    if (!channelUserCountFound) {
      return this.addChannelUserCount(channelUserCount);
    }
    Object.assign(channelUserCountFound, channelUserCount);
  };

  updateUserChannelData = (userChannel: Partial<ChannelSubscription>) => {
    const userChannelFound = this.userChannelData.find((el) => el.uuid === userChannel.uuid);
    if (!userChannelFound) return;
    Object.assign(userChannelFound, userChannel);
  };

  // Remove
  removeSubscribedChannel = (uuid: string) => {
    this.channels = this.channels.filter((channel: Channel) => channel.uuid !== uuid);
  };

  leaveChannel = (channelId: string) => {
    const channelFound = this.channels.find((channel) => channel.uuid === channelId);
    if (!channelFound) return;
    channelFound.isSubscribed = false;
  };

  // API Operations
  async removeChannelApi(channelId: string) {
    await channelApi.removeChannel(channelId);
    this.removeSubscribedChannel(channelId);
  }

  async createChannelApi(
    createChannel: CreateChannel,
    sectionId: string | undefined,
    currentWorkspaceId: string,
  ) {
    const channel = await channelApi.createChannel(createChannel, sectionId, currentWorkspaceId);
    this.addSubscribedChannel(channel);
    return channel;
  }

  async joinChannelApi({ channelId, sectionId }: { channelId: string; sectionId?: string }) {
    const userChannel = await channelApi.joinChannel({ channelId, sectionId });
    const userChannelDataFound = this.findUserChannelDataByChannelId(userChannel.channelId);
    if (userChannelDataFound) {
      this.updateUserChannelData(userChannel);
    } else {
      this.addUserChannelData(userChannel);
    }
  }

  async joinDefaultChannelApi() {
    console.error('Review');
  }

  async leaveChannelApi(channelUuid: string) {
    const res = await channelApi.leaveChannel(channelUuid);
    if (res) {
      this.updateUserChannelData(res.subscriptionDetails);
    }
  }

  async removeUserFromChannelApi(channelUuid: string, userUuid: string) {
    await channelApi.removeUserFromChannel(channelUuid, userUuid);
  }

  async updateChannelApi(uuid: string, updateChannel: UpdateChannel, workspaceId?: string) {
    if (!workspaceId) return;
    const updatedChannel = await channelApi.updateChannel(uuid, updateChannel, workspaceId);
    this.updateSubscribedChannel(updatedChannel);
  }

  async updateChannelPositions(channelPositions: { uuid: string; x: number; y: number }[]) {
    try {
      const updatedChannels = await channelApi.updateChannelPositions(channelPositions);
      updatedChannels.forEach((updatedChannel) => {
        this.updateSubscribedChannel(updatedChannel);
      });
    } catch (error) {
      console.error('Failed to update channel positions:', error);
    }
  }

  async fetchUserChannelData(workspaceId: string) {
    const userChannels = await channelApi.getUserChannelData(workspaceId);
    this.setUserChannelData(userChannels);
  }

  // Gets workspace channels but is not used at the moment
  async fetchSubscribedChannelsApi(workspaceId: string) {
    this.setIsLoading(true);
    try {
      const channels = await channelApi.getChannels(workspaceId);
      this.setSubscribedChannels([
        ...channels.map((channel: Channel) => ({
          ...channel,
          createdAt: channel.createdAt,
          updatedAt: channel.updatedAt,
        })),
      ]);
    } catch (error) {
      console.error(error);
    }
    this.setIsLoading(false);
  }

  async moveNode(channelId: string, position: { x: number; y: number }) {
    return await channelApi.updateNodePosition(channelId, position);
  }

  async fetchChannelUserCounts(workspaceId: string) {
    const data = await channelApi.getChannelUserCounts(workspaceId);
    this.addChannelUserCounts(data);
  }

  // Ui Operations
  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };
}
