import { useStore } from '@/stores/RootStore';
import { ChannelTreeNode } from '../types/channelTreeNode';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import { nodeDimensions } from '../utils/nodeDimensions';

export function useLineCalculations(node: ChannelTreeNode, childNode: ChannelTreeNode) {
  const { isNodeDescendant, draggingNodeId, hoverOffset } = useStore('channelStore');

  const parentConnectionSide =
    childNode.channel.x < node.channel.x ? ConnectionSide.LEFT : ConnectionSide.RIGHT;
  const childConnectionSide =
    parentConnectionSide === ConnectionSide.LEFT ? ConnectionSide.RIGHT : ConnectionSide.LEFT;

  const leftSideOffset = { x: 0, y: nodeDimensions.height / 2 };
  const rightSideOffset = { x: nodeDimensions.width, y: nodeDimensions.height / 2 };

  const childNodeOffset =
    childConnectionSide === ConnectionSide.LEFT ? leftSideOffset : rightSideOffset;
  const parentNodeOffset =
    parentConnectionSide === ConnectionSide.LEFT ? leftSideOffset : rightSideOffset;

  const currentNodeDragged = draggingNodeId === node.channel.uuid;
  const childNodeDragged =
    draggingNodeId === childNode.channel.uuid || isNodeDescendant(childNode.channel.uuid);
  const parentOfCurrentNodeDragged =
    node.channel.parentChannelId && draggingNodeId === node.channel.parentChannelId;

  const xChild = childNode.channel.x + (childNodeDragged ? hoverOffset.x : 0) + childNodeOffset.x;
  const yChild = childNode.channel.y + (childNodeDragged ? hoverOffset.y : 0) + childNodeOffset.y;
  const xParent =
    node.channel.x +
    (currentNodeDragged || parentOfCurrentNodeDragged ? hoverOffset.x : 0) +
    parentNodeOffset.x;
  const yParent =
    node.channel.y +
    (currentNodeDragged || parentOfCurrentNodeDragged ? hoverOffset.y : 0) +
    parentNodeOffset.y;

  return {
    childCoordinates: { x: xChild, y: yChild },
    parentCoordinates: { x: xParent, y: yParent },
    key: `line-${node.channel.uuid}-${childNode.channel.uuid}`,
  };
}
