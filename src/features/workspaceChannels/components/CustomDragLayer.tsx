import { CSSProperties } from 'react';
import { useDragLayer } from 'react-dnd';

const CustomDragLayer = ({
  scale,
  snapState,
}: {
  scale: number;
  snapState: { isSnapping: boolean; snapPosition: { x: number; y: number } };
}) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset || !initialOffset || !item) {
    return null;
  }

  const itemEl = document.getElementById(item.uuid);
  const width = itemEl ? itemEl.offsetWidth : 300;
  const height = itemEl ? itemEl.offsetHeight : 100;

  const { x, y } = {
    x: snapState.isSnapping ? snapState.snapPosition.x : item.x,
    y: snapState.isSnapping ? snapState.snapPosition.y : item.y,
  };

  // Dynamically adjust the transform based on the current scale and offset
  const transform = snapState.isSnapping
    ? `translate(-${width / 2}px, -${height / 2}px)`
    : `translate(${(currentOffset.x - initialOffset.x - width / 2) / scale}px, ${
        (currentOffset.y - initialOffset.y - height / 2) / scale
      }px)`;

  const freeStyles = {
    transform,
    WebkitTransform: transform,
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
  // Render your custom drag preview component
  return (
    <div
      style={layerStyles}
      className="flex items-center justify-center whitespace-nowrap truncate text-lg font-semibold leading-tight rounded-lg bg-card card border border-border opacity-30"
    >
      {item.name}
    </div>
  );
};

export default CustomDragLayer;
