import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { MouseEvent, ReactNode, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import NodeStatus from './NodeStatus';
import { nodeDimensions } from '../utils/nodeDimensions';
import NodePanel from './NodePanel';
import { createTransparentImage } from '../utils/createTransparentImage';
import { ChannelSubscription } from '@/features/channels/types';

type Props = {
  uuid: string;
  label: string;
  x: number;
  y: number;
  isDefault: boolean;
  isHighlighted: boolean;
  onSelectNode: (uuid: string) => void;
  onDragStart: (uuid: string) => void;
  isFocused: boolean;
  children?: ReactNode;
};

const Node = observer(
  ({
    uuid,
    label,
    x,
    y,
    isDefault,
    isHighlighted,
    onSelectNode,
    onDragStart,
    isFocused,
  }: Props) => {
    const { currentChannelId, setCurrentChannelUuid, userChannelData } = useStore('channelStore');
    const { isEditing, setIsDraggingNode } = useStore('nodemapStore');
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

    const userChannelDetails = userChannelData.find(
      (el: ChannelSubscription) => el.channelId === uuid,
    );

    const isSubscribed = userChannelDetails?.isSubscribed || isDefault;

    const isBeingDragged = isHighlighted;

    return (
      <>
        <div
          id={uuid}
          onMouseDown={(e: MouseEvent) => {
            e.stopPropagation();
          }}
          data-node-id={uuid}
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
          }  ${isHighlighted ? 'ring-2 ring-primary-light' : ''}`}
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

              {!isDefault && isSubscribed && userChannelDetails?.status && (
                <NodeStatus
                  uuid={uuid}
                  status={userChannelDetails.status}
                  isActive={currentChannelId === uuid}
                />
              )}
            </div>
          </>

          {/* {isHovered && (
            <HoverConnections
              uuid={uuid}
              leftSideActive={leftSideActive}
              rightSideActive={rightSideActive}
            />
          )} */}

          {isFocused && <NodePanel uuid={uuid} />}
        </div>
      </>
    );
  },
);

export default Node;

// w-[280px] h-[80px] z-[100]
