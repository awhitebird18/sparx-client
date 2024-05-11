import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ReactNode, useState } from 'react';
import NodeStatus from './NodeStatus';
import { nodeDimensions } from '../utils/nodeDimensions';
import NodePanel from './NodePanel';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import HoverConnections from './HoverConnections';
import useConnectionSides from '../hooks/useConnectionSides';
import useNodeDrag from '../hooks/useNodeDrag';

type Props = {
  uuid: string;
  label: string;
  x: number;
  y: number;
  isDefault: boolean;
  children?: ReactNode;
  parentChannelId?: string;
};

const Node = observer(({ uuid, label, x, y, parentChannelId }: Props) => {
  const {
    currentChannelId,
    setCurrentChannelUuid,
    focusedNodeId,
    findUserChannelDataByChannelId,
    setDraggingNodeId,
  } = useStore('channelStore');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const drag = useNodeDrag(uuid, x, y, label);
  const connectionSides = useConnectionSides(x, y, parentChannelId);
  const userChannelDetails = findUserChannelDataByChannelId(uuid);
  const isFocused = focusedNodeId === uuid;
  const isSubscribed = userChannelDetails?.isSubscribed;

  return (
    <>
      <div
        id={uuid}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-node-id={uuid}
        ref={drag}
        style={{
          position: 'absolute',
          left: x,
          top: y,
        }}
        onDragStart={() => setDraggingNodeId(uuid)}
        onDoubleClick={() => {
          if (!isSubscribed) return;
          setCurrentChannelUuid(uuid);
        }}
        className={`card-base !z-20 transition-colors w-[${nodeDimensions.width}px] h-[${
          nodeDimensions.height
        }px] cursor-pointer shadow-lg justify-center text-main node text-center gap-2 flex flex-col px-4 items-start duration-400 ${
          currentChannelId === uuid ? 'bg-primary text-white border-primary' : ''
        } ${isSubscribed ? '' : 'opacity-50'}`}
      >
        {<Label label={label} />}

        {isSubscribed && userChannelDetails?.status && (
          <NodeStatus
            uuid={uuid}
            status={userChannelDetails.status}
            isActive={currentChannelId === uuid}
          />
        )}

        {isHovered && (
          <HoverConnections
            uuid={uuid}
            leftSideActive={connectionSides.includes(ConnectionSide.LEFT)}
            rightSideActive={connectionSides.includes(ConnectionSide.RIGHT)}
          />
        )}
      </div>
      {isFocused && (
        <div
          style={{
            position: 'absolute',
            left: x,
            top: y,
          }}
        >
          <NodePanel uuid={uuid} />
        </div>
      )}
    </>
  );
});

export default Node;

// w-[280px] h-[80px]

type LableProps = { label: string };
const Label = ({ label }: LableProps) => (
  <span className="pointer-events-none font-semibold flex truncate whitespace-nowrap max-w-[250px] text-lg leading-tight w-full">
    {label}
  </span>
);
