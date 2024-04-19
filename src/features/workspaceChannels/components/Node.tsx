import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { MouseEvent, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import NodeStatus from './NodeStatus';
import { nodeDimensions } from '../utils/nodeDimensions';
import HoverConnections from './HoverConnections';
import NodePanel from './NodePanel';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import { createTransparentImage } from '../utils/createTransparentImage';

type Props = {
  uuid: string;
  label: string;
  x: number;
  y: number;
  hideUnstarted: boolean;
  isDefault: boolean;
  isHighlighted: boolean;
  onSelectNode: (uuid: string) => void;
  onDragStart: (uuid: string) => void;
  onDragEnd: () => void;
  isHovering: boolean;
  isFocused: boolean;
};

const Node = observer(
  ({
    uuid,
    label,
    x,
    y,
    hideUnstarted,
    isDefault,
    isHighlighted,
    onSelectNode,
    onDragStart,
    onDragEnd,
    isHovering,
    isFocused,
  }: Props) => {
    const { currentChannelId, setCurrentChannelUuid, userChannelData, setIsDraggingNode } =
      useStore('channelStore');
    const { channelConnectors } = useStore('channelConnectorStore');

    const { isEditing } = useStore('channelStore');
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const [{ isDragging }, drag, preview] = useDrag(
      () => ({
        type: 'node',
        item: { uuid, x, y, name: label },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [uuid, x, y, label],
    );

    useEffect(() => {
      setIsDraggingNode(isDragging);
    }, [isDragging, setIsDraggingNode]);

    useEffect(() => {
      preview(createTransparentImage());
    }, [preview]);

    const conditionalDragRef = isEditing ? drag : null;

    const userChannelDetails = userChannelData.find((el: any) => el.channel.uuid === uuid) ?? {};

    const isSubscribed = userChannelDetails.isSubscribed || isDefault;

    const isBeingDragged = isHovering && isHighlighted;
    const childConnector = channelConnectors.find((connector) => connector.end?.nodeId === uuid);
    const isChildNode = !!childConnector;
    const connectionSide = childConnector?.end?.side;
    const leftSideActive = !isChildNode || (isChildNode && connectionSide === ConnectionSide.RIGHT);
    const rightSideActive = !isChildNode || (isChildNode && connectionSide === ConnectionSide.LEFT);

    return (
      <>
        <div
          id={uuid}
          onMouseDown={(e: MouseEvent) => {
            e.stopPropagation();
          }}
          data-node-id={uuid}
          onDragEnd={onDragEnd}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          ref={conditionalDragRef}
          style={{
            position: 'absolute',
            left: x,
            top: y,
          }}
          className={`node card cursor-pointer !z-50 transition-colors w-[${
            nodeDimensions.width
          }px] h-[${
            nodeDimensions.height
          }px] px-4 shadow-lg flex flex-col items-start duration-400 overflow-visible absolute justify-center border border-border rounded-lg bg-card text-main ${
            currentChannelId === uuid ? 'bg-primary text-white border-primary' : ''
          } ${isBeingDragged ? 'transition-opacity !opacity-100' : ''} ${
            isSubscribed ? '' : 'opacity-50'
          } ${hideUnstarted && !isSubscribed && 'hidden'} ${
            isHighlighted ? 'ring-2 ring-primary-light' : ''
          }`}
          onClick={() => {
            if (!isSubscribed || isEditing) return;
            onSelectNode(uuid);
          }}
          draggable
          onDragStart={() => onDragStart(uuid)}
          onDoubleClick={() => {
            if (!isSubscribed) return;
            setCurrentChannelUuid(uuid);
          }}
        >
          <>
            <div
              className={`node text-center gap-2 flex  flex-col ${
                isEditing && 'pointer-events-none'
              }`}
            >
              <span
                className={`font-semibold flex truncate whitespace-nowrap max-w-[250px] text-lg leading-tight w-full`}
              >
                {label}
              </span>

              {!isDefault && isSubscribed && (
                <NodeStatus
                  uuid={uuid}
                  status={userChannelDetails.status}
                  isActive={currentChannelId === uuid}
                />
              )}
            </div>
          </>

          {isHovered && (
            <HoverConnections
              uuid={uuid}
              leftSideActive={leftSideActive}
              rightSideActive={rightSideActive}
            />
          )}

          {isFocused && <NodePanel uuid={uuid} />}
        </div>
      </>
    );
  },
);

export default Node;

// w-[280px] h-[80px] z-[100]
