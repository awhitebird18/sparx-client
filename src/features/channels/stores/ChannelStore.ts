import { makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import channelApi from '@/features/channels/api';
import { Channel, ChannelSubscription, CreateChannel, UpdateChannel } from '../types';
import { ChannelUserCount } from '@/features/channels/types/channelUserCount';

dayjs.extend(utc);
dayjs.extend(timezone);

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
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setFocusedNodeId(focusedNodeId: string | null) {
    this.focusedNodeId = focusedNodeId;
  }

  setHoverOffset(hoverOffset: { x: number; y: number }) {
    this.hoverOffset = hoverOffset;
  }

  setDraggingNodeId(draggingNodeId: string | null) {
    this.draggingNodeId = draggingNodeId;
  }

  get descendantNodeIds() {
    const descendants: string[] = [];

    if (!this.draggingNodeId) return descendants;

    const rootNode = this.findNode(this.draggingNodeId);

    if (rootNode) {
      this.collectDescendants(rootNode, descendants);
    }

    return descendants;
  }

  findDirectDescendants(channelId: string) {
    const rootNode = this.findNodeRecursive(this.channelTree, channelId);

    return rootNode?.children;
  }

  isNodeDescendant(targetId: string): boolean {
    return this.descendantNodeIds.includes(targetId);
  }

  findNode(nodeId: string): ChannelTreeNode | undefined {
    // Start the recursive search from the root nodes
    return this.findNodeRecursive(this.channelTree, nodeId);
  }

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

  collectDescendants(node: ChannelTreeNode, descendants: string[]) {
    for (const child of node.children) {
      descendants.push(child.channel.uuid);
      this.collectDescendants(child, descendants);
    }
  }

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

  filterTempChannels = () => {
    this.channels = this.channels.filter((el: Channel) => !el.isTemp);
  };

  findChannelByUuid = (uuid: string) => {
    return this.channels.find((channel: Channel) => channel.uuid === uuid);
  };

  findTempChannel = () => {
    return this.channels.find((el: Channel) => el.isTemp);
  };

  setSubscribedChannels = (channels: Channel[]) => {
    this.channels = channels;
  };

  setCurrentChannelUuid = (channelUuid: string | undefined) => {
    this.currentChannelId = channelUuid;
  };

  addSubscribedChannel = (channel: Channel) => {
    if (this.findChannelByUuid(channel.uuid)) return;

    this.channels.push(channel);
  };

  updateSubscribedChannel = (updatedChannel: Partial<Channel>) => {
    const channelFound = this.channels.find((channel) => channel.uuid === updatedChannel.uuid);

    if (!channelFound) return;

    Object.assign(channelFound, updatedChannel);
  };

  updateUserChannelData = (userChannel: Partial<ChannelSubscription>) => {
    const userChannelFound = this.userChannelData.find((el) => el.uuid === userChannel.uuid);

    if (!userChannelFound) return;

    Object.assign(userChannelFound, userChannel);
  };

  leaveChannel = (channelId: string) => {
    const channelFound = this.channels.find((channel) => channel.uuid === channelId);

    if (!channelFound) return;

    channelFound.isSubscribed = false;
  };

  removeSubscribedChannel = (uuid: string) => {
    this.channels = this.channels.filter((channel: Channel) => channel.uuid !== uuid);
  };

  removeChannelApi = async (channelId: string) => {
    await channelApi.removeChannel(channelId);

    this.removeSubscribedChannel(channelId);
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  createChannelApi = async (
    createChannel: CreateChannel,
    sectionId: string | undefined,
    currentWorkspaceId: string,
  ) => {
    const channel = await channelApi.createChannel(createChannel, sectionId, currentWorkspaceId);

    this.addSubscribedChannel(channel);
    return channel;
  };

  joinChannelApi = async ({ channelId, sectionId }: { channelId: string; sectionId?: string }) => {
    const userChannel = await channelApi.joinChannel({ channelId, sectionId });

    const userChannelDataFound = this.findUserChannelDataByChannelId(userChannel.channelId);

    if (userChannelDataFound) {
      this.updateUserChannelData(userChannel);
    } else {
      this.addUserChannelData(userChannel);
    }
  };

  joinDefaultChannelApi = async () => console.error('Review');

  leaveChannelApi = async (channelUuid: string) => {
    const res = await channelApi.leaveChannel(channelUuid);

    if (res) {
      this.updateUserChannelData(res.subscriptionDetails);
    }
  };

  removeUserFromChannelApi = async (channelUuid: string, userUuid: string) => {
    await channelApi.removeUserFromChannel(channelUuid, userUuid);
  };

  updateChannelApi = async (uuid: string, updateChannel: UpdateChannel, workspaceId?: string) => {
    if (!workspaceId) return;
    const updatedChannel = await channelApi.updateChannel(uuid, updateChannel, workspaceId);
    this.updateSubscribedChannel(updatedChannel);
  };

  setChannelUserIds = (channelUserIds: string[]) => {
    this.channelUserIds = channelUserIds;
  };

  setUserChannelData = (userChannels: ChannelSubscription[]) => {
    this.userChannelData = userChannels;
  };

  fetchUserChannelData = async (workspaceId: string) => {
    const userChannels = await channelApi.getUserChannelData(workspaceId);

    this.setUserChannelData(userChannels);
  };

  findUserChannelDataByChannelId = (channelId: string) => {
    const channelData = this.userChannelData.find(
      (el: ChannelSubscription) => el.channelId === channelId,
    );

    return channelData;
  };

  addUserChannelData = (userData: ChannelSubscription) => {
    this.userChannelData.push(userData);
  };

  // Gets workspace channels but is not used at the moment
  fetchSubscribedChannelsApi = async (workspaceId: string) => {
    this.setIsLoading(true);

    try {
      const channels = await channelApi.getChannels(workspaceId);

      this.setSubscribedChannels([
        ...channels.map((channel: Channel) => ({
          ...channel,
          createdAt: dayjs(channel.createdAt),
          updatedAt: dayjs(channel.updatedAt),
        })),
      ]);
    } catch (error) {
      console.error(error);
    }
    this.setIsLoading(false);
  };

  moveNode = async (channelId: string, position: { x: number; y: number }) => {
    return await channelApi.updateNodePosition(channelId, position);
  };

  fetchChannelUserCounts = async (workspaceId: string) => {
    const data = await channelApi.getChannelUserCounts(workspaceId);
    this.addChannelUserCounts(data);
  };

  // Channels
  addChannelUserCounts = (channelUserCounts: ChannelUserCount[]) => {
    this.channelUserCounts.push(...channelUserCounts);
  };

  addChannelUserCount = (channelUserCounts: ChannelUserCount) => {
    this.channelUserCounts.push(channelUserCounts);
  };

  updateChannelUserCount = (channelUserCount: ChannelUserCount) => {
    const channelUserCountFound = this.findChannelUserCount(channelUserCount.channelUuid);
    if (!channelUserCountFound) {
      return this.addChannelUserCount(channelUserCount);
    }
    Object.assign(channelUserCountFound, channelUserCount);
  };

  findChannelUserCount = (channelUuid: string) => {
    return this.channelUserCounts.find((el: ChannelUserCount) => el.channelUuid === channelUuid);
  };
}
