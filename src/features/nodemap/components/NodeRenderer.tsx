import React from 'react';
import { observer } from 'mobx-react-lite';
import Node from './Node';
import { ChannelTreeNode } from '../types/channelTreeNode';
import { useStore } from '@/stores/RootStore';

type Props = {
  node: ChannelTreeNode;
  hoverOffset: { x: number; y: number };
};

const NodeRenderer: React.FC<Props> = observer(({ node, hoverOffset }) => {
  const { draggingNodeId, isNodeDescendant } = useStore('channelStore');

  const currentNodeDragged = draggingNodeId === node.channel.uuid;
  const isBeingDragged = isNodeDescendant(node.channel.uuid) || currentNodeDragged;
  const { channel } = node;
  const x = channel.x + (isBeingDragged ? hoverOffset.x : 0);
  const y = channel.y + (isBeingDragged ? hoverOffset.y : 0);

  return (
    <Node
      key={channel.uuid}
      uuid={channel.uuid}
      label={channel.name}
      parentChannelId={channel.parentChannelId}
      x={x}
      y={y}
      isDefault={!!channel.isDefault}
    />
  );
});

export default NodeRenderer;
