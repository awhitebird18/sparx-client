import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ReactNode, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import NodeStatus from './NodeStatus';
import { nodeDimensions } from '../utils/nodeDimensions';
import NodePanel from './NodePanel';
import { createTransparentImage } from '../utils/createTransparentImage';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import HoverConnections from './HoverConnections';

type Props = {
  uuid: string;
  label: string;
  x: number;
  y: number;
  isDefault: boolean;
  children?: ReactNode;
  parentChannelId?: string;
};

const Node = observer(({ uuid, label, x, y, isDefault, parentChannelId }: Props) => {
  const {
    currentChannelId,
    setCurrentChannelUuid,
    findChannelByUuid,
    focusedNodeId,
    findUserChannelDataByChannelId,
    setDraggingNodeId,
  } = useStore('channelStore');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [, drag, preview] = useDrag(
    () => ({
      type: 'node',
      item: { uuid, x, y, name: label },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [uuid, x, y, label],
  );
  const [connectionSides, setConnectionSides] = useState<ConnectionSide[]>([]);
  const userChannelDetails = findUserChannelDataByChannelId(uuid);
  const isFocused = focusedNodeId === uuid;

  useEffect(() => {
    if (parentChannelId) {
      const parentChannel = findChannelByUuid(parentChannelId);

      if (!parentChannel) return;

      const parentChannelCoordinates = { x: parentChannel.x, y: parentChannel.y };

      if (parentChannelCoordinates.x < x) {
        setConnectionSides((prev) => {
          prev.push(ConnectionSide.RIGHT);

          return prev;
        });
      }
      if (parentChannelCoordinates.x > x) {
        setConnectionSides((prev) => {
          prev.push(ConnectionSide.LEFT);

          return prev;
        });
      }
    } else {
      setConnectionSides((prev) => {
        prev.push(ConnectionSide.LEFT);
        prev.push(ConnectionSide.RIGHT);

        return prev;
      });
    }
  }, [findChannelByUuid, parentChannelId, x]);

  useEffect(() => {
    preview(createTransparentImage());
  }, [preview]);

  const isSubscribed = userChannelDetails?.isSubscribed || isDefault;

  return (
    <div
      id={uuid}
      style={{
        position: 'absolute',
        left: x,
        top: y,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-node-id={uuid}
      ref={drag}
      className={`!z-50 transition-colors w-[${nodeDimensions.width}px] h-[${nodeDimensions.height}px] cursor-pointer`}
      onMouseUp={() => setDraggingNodeId(uuid)}
      onDragStart={() => setDraggingNodeId(uuid)}
      onDragEnd={() => setDraggingNodeId(null)}
      onDoubleClick={() => {
        if (!isSubscribed) return;
        setCurrentChannelUuid(uuid);
      }}
    >
      <div
        className={`node text-center gap-2 flex flex-col w-full h-full card  px-4  items-start duration-400 overflow-visible shadow-lg absolute justify-center border border-border rounded-lg bg-card text-main ${
          currentChannelId === uuid ? 'bg-primary text-white border-primary' : ''
        } ${isSubscribed ? '' : 'opacity-50'} pointer-events-none`}
      >
        <span
          className={`font-semibold flex truncate whitespace-nowrap max-w-[250px] text-lg leading-tight w-full`}
        >
          {label}
        </span>

        {!isDefault && isSubscribed && userChannelDetails?.status && (
          <NodeStatus
            uuid={uuid}
            status={userChannelDetails.status}
            isActive={currentChannelId === uuid}
          />
        )}
      </div>

      {isFocused && <NodePanel uuid={uuid} />}
      {isHovered && (
        <HoverConnections
          uuid={uuid}
          leftSideActive={connectionSides.includes(ConnectionSide.LEFT)}
          rightSideActive={connectionSides.includes(ConnectionSide.RIGHT)}
        />
      )}
    </div>
  );
});

export default Node;

// w-[280px] h-[80px] z-[100]
