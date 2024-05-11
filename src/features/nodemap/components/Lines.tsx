import LineRenderer from './LineRenderer';
import { ChannelTreeNode } from '../types/channelTreeNode';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import React from 'react';

const Lines = observer(() => {
  const { channelTree } = useStore('channelStore');

  const renderLine = (node: ChannelTreeNode): JSX.Element => {
    return (
      <React.Fragment key={node.channel.uuid}>
        {node.children.map((childNode) => (
          <LineRenderer key={childNode.channel.uuid} node={node} childNode={childNode} />
        ))}
        {node.children.map(renderLine)}
      </React.Fragment>
    );
  };

  const lines = channelTree.map(renderLine);

  return (
    <svg
      className="absolute h-full w-full "
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
    >
      {lines}
    </svg>
  );
});

export default Lines;
