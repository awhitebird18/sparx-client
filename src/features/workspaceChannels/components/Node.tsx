import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { MouseEvent, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

import NodeStatus from './NodeStatus';
import HoverIndicators from './HoverIndicators';
import { updateUserChannel } from '@/features/channels/api/updateUserChannel';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/ContextMenu';
import {
  ChevronDoubleRight,
  PencilSquare,
  People,
  XSquare,
  Alarm,
  PlayCircle,
  StarFill,
  AlignStart,
  XCircle,
  Dot,
  ChatSquareDots,
  Stack,
  Bookmark,
  FileText,
  Plus,
} from 'react-bootstrap-icons';
import { ChannelUserCount } from '../types/channelUserCount';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import { useNavigate } from 'react-router-dom';
import { ModalName } from '@/components/modal/modalList';
import { nodeDimensions } from '../utils/nodeDimensions';
import { HoverConnections } from './HoverConnections';
import NodePanel from './NodePanel';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';

const createTransparentImage = () => {
  const img = new Image();
  img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  return img;
};

const Node = ({
  uuid,
  label,
  x,
  y,
  hideUnstarted,
  isDefault,
  handleCreateLine,
  isHighlighted,
  onSelectNode,
  onDragStart,
  onDragEnd,
  isHovering,
  isFocused,
}: any) => {
  const {
    currentChannelId,
    setCurrentChannelUuid,

    userChannelData,
    setIsDraggingNode,
    setIsFullscreen,
  } = useStore('channelStore');
  const { channelConnectors } = useStore('channelConnectorStore');
  const { findChannelUnreads } = useStore('channelUnreadStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { flashcardsDueCounts } = useStore('flashcardStore');

  const { channelUserCounts } = useStore('workspaceChannelStore');
  const { leaveChannelApi, isEditing } = useStore('channelStore');
  const [isHovered, setIsHovered] = useState(false);
  const { setActiveModal } = useStore('modalStore');
  // const [flashcardsDueCount] = useState(1);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useStore('notificationStore');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'node',
      item: { uuid, x, y, name: label }, // Indicate if it's a multi-drag item
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

  if (!handleCreateLine) return null;

  const conditionalDragRef = isEditing ? drag : null;

  const userCount = channelUserCounts.find(
    (el: ChannelUserCount) => el.channelUuid === uuid,
  )?.userCount;

  // const handleMoveNode = async (uuid: string, x: number, y: number) => {
  //   updateSubscribedChannel({ uuid, x, y });

  //   await updateChannelApi(uuid, { x, y }, currentWorkspaceId);
  // };

  // const handleRemoveNode = (nodeId: string) => {
  //   setActiveModal({ type: 'RemoveChannelModal', payload: { uuid: nodeId, setChannelConnectors } });
  // };

  const unreadMessageCount = findChannelUnreads(uuid)?.unreadCount;

  const handleUpdateNode = (e: MouseEvent) => {
    e.stopPropagation();
    setActiveModal({ type: 'CreateChannelModal', payload: { uuid } });
  };

  const userChannelDetails = userChannelData.find((el: any) => el.channel.uuid === uuid) ?? {};

  const isSubscribed = userChannelDetails.isSubscribed || isDefault;

  const handleQuickIconClick = (nodeId: string, module: ModalName) => {
    setCurrentChannelUuid(nodeId);
    setIsFullscreen(false);
    setActiveModal({ type: module });
  };

  const flashcardsDueCount = flashcardsDueCounts.find(
    (flashcard: any) => flashcard.channelId === uuid,
  );

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
          // cursor: 'move',
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
          // setCurrentChannelUuid(uuid);
          // addNotification({ title: 'Node changed', description: `Now viewing ${label}` });
        }}
        draggable
        onDragStart={(e) => onDragStart(e, uuid)}
        onDoubleClick={(e) => {
          if (!isSubscribed) return;
          setCurrentChannelUuid(uuid);
          // handleUpdateNode(e);
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

            <div className="flex justify-between gap-8">
              {!isDefault && isSubscribed && (
                <NodeStatus
                  uuid={uuid}
                  status={userChannelDetails.status}
                  isActive={currentChannelId === uuid}
                />
              )}

              <div
                className={`${
                  isDefault || !isSubscribed ? 'hidden' : 'flex'
                } items-center gap-0.5 text-main text-xs`}
              >
                {/* {nodemapSettings.userCountVisible && (
                      <div
                        onClick={() => handleQuickIconClick(uuid, 'members')}
                        className="card flex gap-1 items-center text-white font-semibold bg-transparent hover:bg-slate-500/20 border border-border  h-6 w-10 justify-center rounded-md text-xs"
                      >
                        {userCount} <People />
                      </div>
                    )}

                    <div
                      onClick={() => handleQuickIconClick(uuid, 'notes')}
                      className={`card flex gap-1 items-center text-white font-semibold bg-transparent hover:bg-slate-500/20 border border-border  h-6 w-10 justify-center rounded-md text-xs ${nodemapSettings.unreadMessageCountVisible}`}
                    >
                      0
                      <FileText />
                    </div>
                    <div
                      onClick={() => handleQuickIconClick(uuid, 'discussions')}
                      className={`card flex gap-1 items-center text-white font-semibold bg-transparent hover:bg-slate-500/20 border border-border  h-6 w-10 justify-center rounded-md text-xs ${nodemapSettings.unreadMessageCountVisible}`}
                    >
                      {unreadMessageCount}

                      <ChatSquareDots />
                    </div>
                    {unreadMessageCount ? (
                      <div className="text-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5  flex items-center justify-center rounded-full bg-rose-500">
                        {unreadMessageCount}
                      </div>
                    ) : null}

                    <div
                      onClick={() => handleQuickIconClick(uuid, 'flashcards')}
                      className={`card flex gap-1 items-center text-white font-semibold bg-transparent hover:bg-slate-500/20 border border-border  h-6 w-10 justify-center rounded-md text-xs ${
                        !nodemapSettings.flashcardsDueVisible && 'opacity-0'
                      }`}
                    >
                      {flashcardsDueCount?.count ?? 0}
                      <Stack />
                    </div> */}
              </div>
            </div>
          </div>
        </>
        {/* {isHovered && isEditing && (
              <HoverIndicators
                uuid={uuid}
                handleCreateLine={handleCreateLine}
                workspaceId={currentWorkspaceId}
              />
            )} */}
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
};

export default observer(Node);

// w-[280px] h-[80px] z-[100]
