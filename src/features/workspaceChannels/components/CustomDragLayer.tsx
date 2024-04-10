import { CSSProperties } from 'react';
import { useDragLayer } from 'react-dnd';

const CustomDragLayer = ({
  scale,
  snapState,
}: {
  scale: number;
  snapState: {
    isSnapping: boolean;
    xSnapped: boolean;
    ySnapped: boolean;
    snapPosition: { x: number; y: number };
  };
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

  const width = 275;
  const height = 75;

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
    <>
      <div
        style={layerStyles}
        className="flex items-center justify-center whitespace-nowrap truncate text-lg font-semibold leading-tight rounded-lg bg-card card border border-border opacity-30 overflow-visible"
      >
        {item.name}
      </div>
      {snapState.xSnapped ? (
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
      ) : null}
    </>
  );
};

export default CustomDragLayer;
