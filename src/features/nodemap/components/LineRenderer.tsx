import Line from './Line';
import { observer } from 'mobx-react-lite';
import { ChannelTreeNode } from '../types/channelTreeNode';
import { useLineCalculations } from '../hooks/useLineCalculations';

type Props = { node: ChannelTreeNode; childNode: ChannelTreeNode };

const LineRenderer = observer(({ node, childNode }: Props) => {
  const { childCoordinates, parentCoordinates, key } = useLineCalculations(node, childNode);

  return (
    <Line key={key} childCoordinates={childCoordinates} parentCoordinates={parentCoordinates} />
  );
});

export default LineRenderer;
