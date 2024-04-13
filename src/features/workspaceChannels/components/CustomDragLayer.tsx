import { CSSProperties } from 'react';
import { useDragLayer } from 'react-dnd';
import { nodeDimensions } from '../utils/nodeDimensions';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Channel } from '@/features/channels/types';

const gridSize = 40; // Size of each grid square
const snapToGrid = true;

const CustomDragLayer = ({
  scale,
  snapState,
  selectedNodes,
}: {
  selectedNodes: string[];
  scale: number;
  snapState: {
    isSnapping: boolean;
    xSnapped: boolean;
    ySnapped: boolean;
    snapPosition: { x: number; y: number };
  };
}) => {
  const { subscribedChannels } = useStore('channelStore');
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const draggedChannels = subscribedChannels.filter((channel: Channel) => {
    return selectedNodes.includes(channel.uuid);
  });

  if (!isDragging || !currentOffset || !initialOffset || !item) {
    return null;
  }

  const width = nodeDimensions.width;
  const height = nodeDimensions.height;

  const transform = snapState.isSnapping
    ? ''
    : `translate(${(currentOffset.x - initialOffset.x) / scale}px, ${
        (currentOffset.y - initialOffset.y) / scale
      }px)`;

  const freeStyles = {
    transform,
    WebkitTransform: transform,
  };

  // Dynamically adjust the transform based on the current scale and offset

  // Render your custom drag preview component
  return (
    <>
      {draggedChannels.map((channel) => {
        const { x, y } = {
          x: Math.round((channel.x + snapState.snapPosition.x) / gridSize) * gridSize,
          y: Math.round((channel.y + snapState.snapPosition.y) / gridSize) * gridSize,
        };

        const layerStyles = {
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 100,
          left: x,
          top: y,
          width: `${width}px`,
          height: `${height}px`,
          ...freeStyles,
        } as CSSProperties;

        return (
          <div
            style={layerStyles}
            className="flex items-center justify-center whitespace-nowrap truncate text-lg font-semibold leading-tight rounded-lg bg-card card border border-border opacity-100 overflow-visible"
          >
            {item.name}
          </div>
        );
      })}
    </>
  );
};

export default observer(CustomDragLayer);

{
  /* {snapState.xSnapped ? (
            <div
              className={`absolute h-full opacity-30 w-0  !border-dashed border-r-4 border-border`}
              style={{ left: `${x}px`, top: 0 }}
            />
          ) : null}
          {snapState.ySnapped ? (
            <div
              className="absolute w-full opacity-30 h-0  border-t-4 !border-dashed border-border"
              style={{ left: 0, top: `${y}px` }}
            />
          ) : null} */
}
