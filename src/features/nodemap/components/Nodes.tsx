import NodeRenderer from './NodeRenderer';
import { observer } from 'mobx-react-lite';
import { ChannelTreeNode } from '../types/channelTreeNode';
import { useStore } from '@/stores/RootStore';

const Nodes = observer(() => {
  const { hoverOffset, channelTree } = useStore('channelStore');

  const renderNode = (node: ChannelTreeNode): JSX.Element => {
    return (
      <div key={node.channel.uuid}>
        <NodeRenderer node={node} hoverOffset={hoverOffset} />
        {node.children.map(renderNode)}
      </div>
    );
  };

  const nodes = channelTree.map(renderNode);

  return <>{nodes}</>;
});

export default Nodes;
