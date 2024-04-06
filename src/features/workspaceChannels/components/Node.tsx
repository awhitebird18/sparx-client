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
} from 'react-bootstrap-icons';
import { ChannelUserCount } from '../types/channelUserCount';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import { useNavigate } from 'react-router-dom';

const Node = ({
  uuid,
  label,
  x,
  y,
  onRemoveNode,
  hideUnstarted,
  isDefault,
  handleCreateLine,
}: any) => {
  const {
    currentChannelId,
    setCurrentChannelUuid,
    updateUserChannelData,
    joinChannelApi,
    userChannelData,
    setIsDraggingNode,
    setIsFullscreen,
  } = useStore('channelStore');
  // const { setChannelConnectors } = useStore('channelConnectorStore');
  const { findChannelUnreads } = useStore('channelUnreadStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { flashcardsDueCounts } = useStore('flashcardStore');
  const { directChannelSectionId } = useStore('sectionStore');
  const { channelUserCounts, nodemapSettings } = useStore('workspaceChannelStore');
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

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'node',
      item: { uuid, x: x, y: y },

      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
          // We'll now only get the drag state, not set the position here
        };
      },
    }),
    [uuid, x, y],
  );

  useEffect(() => {
    setIsDraggingNode(isDragging);
  }, [isDragging, setIsDraggingNode]);

  if (!handleCreateLine) return null;

  const conditionalDragRef = isEditing && !isDefault ? drag : null;

  const userCount = channelUserCounts.find(
    (el: ChannelUserCount) => el.channelUuid === uuid,
  )?.userCount;

  const handleUpdateChannelStatus = async (statusVal: CompletionStatus, e: MouseEvent) => {
    e.stopPropagation();

    const channel = await updateUserChannel(uuid, { status: statusVal });

    updateUserChannelData({ uuid: channel.uuid, status: channel.status });
  };

  // const handleMoveNode = async (uuid: string, x: number, y: number) => {
  //   updateSubscribedChannel({ uuid, x, y });

  //   await updateChannelApi(uuid, { x, y }, currentWorkspaceId);
  // };

  // const handleRemoveNode = (nodeId: string) => {
  //   setActiveModal({ type: 'RemoveChannelModal', payload: { uuid: nodeId, setChannelConnectors } });
  // };

  const handleJoin = async (channelId: string) => {
    // if (!directChannelSectionId) return;
    await joinChannelApi({ channelId, sectionId: directChannelSectionId });
  };

  const handleLeaveChannel = async (channelId: string) => {
    await leaveChannelApi(channelId);

    const navHistoryString = window.localStorage.getItem('navigationHistory');

    const historyParsed = navHistoryString && JSON.parse(navHistoryString);

    if (historyParsed?.length && currentChannelId === channelId) {
      setCurrentChannelUuid(historyParsed[historyParsed.length - 2].nodeId);
    }
  };

  const unreadMessageCount = findChannelUnreads(uuid)?.unreadCount;

  const handleUpdateNode = (e: MouseEvent) => {
    e.stopPropagation();
    setActiveModal({ type: 'CreateChannelModal', payload: { uuid } });
  };

  const handleApplyToFavorites = (channelId: string) => {
    setContextMenuOpen(false);
    setActiveModal({ type: 'AddChannelToSectionModal', payload: { channelId } });
  };

  const userChannelDetails = userChannelData.find((el: any) => el.channel.uuid === uuid) ?? {};

  const isSubscribed = userChannelDetails.isSubscribed || isDefault;

  const handleQuickIconClick = (nodeId: string, module: string) => {
    setCurrentChannelUuid(nodeId);
    setIsFullscreen(false);
    navigate(`/app/${module}`);
  };

  const flashcardsDueCount = flashcardsDueCounts.find(
    (flashcard: any) => flashcard.channelId === uuid,
  );

  return (
    <>
      <ContextMenu
        onOpenChange={(val) => {
          if (val) {
            setContextMenuOpen(val);
          }
        }}
      >
        <ContextMenuTrigger disabled={isDefault} asChild>
          <div
            id={uuid}
            onMouseDown={(e: MouseEvent) => {
              e.stopPropagation();
            }}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            ref={conditionalDragRef}
            style={{
              // zIndex: 100,
              left: x, // Center the node
              top: y, // Center the node
              // transform: `translate(-50%, -50%) scale(${zoomLevel})`,
              // transformOrigin: 'center', // Change to 'center'
            }}
            className={`cursor-pointer -translate-x-1/2 -translate-y-1/2 shadow-md items-center flex flex-col transition-colors duration-400 gap-1 absolute p-0 justify-center border-1 border-border rounded-3xl bg-card text-main ${
              currentChannelId === uuid ? 'bg-primary text-white border-primary' : ''
            } ${isDragging ? 'opacity-0' : ''} ${isSubscribed ? '' : 'opacity-60'} ${
              hideUnstarted && !isSubscribed && 'hidden'
            } ${isDefault ? 'w-[325px] h-[130px] p-6 !rounded-full' : 'w-[200px] h-[100px]'}`}
            onClick={() => {
              if (!isSubscribed || isEditing) return;

              setCurrentChannelUuid(uuid);

              addNotification({ title: 'Node changed', description: `Now viewing ${label}` });
            }}
            onDoubleClick={(e) => {
              if (isDefault || !isEditing) return;
              handleUpdateNode(e);
            }}
          >
            <>
              <div
                className={`${
                  isDefault || !isSubscribed ? 'hidden' : 'flex'
                } items-center gap-1.5 text-main rounded-lg text-xs`}
                style={{
                  position: 'absolute',
                  left: 0, // Center the node
                  top: 0, // Center the node
                  // transform: `scale(${zoomLevel})`,
                  transform: `translateY(-120%)`,
                  transformOrigin: 'top left',
                  // zIndex: 10,
                }}
              >
                {nodemapSettings.userCountVisible && userCount && userCount > 0 && (
                  <div
                    onClick={() => handleQuickIconClick(uuid, 'members')}
                    className="card flex gap-1 items-center text-white font-semibold bg-primary-members border border-border-members shadow py-1 px-2 rounded-xl text-xs"
                  >
                    {userCount} <People className="thick-icon" />
                  </div>
                )}
                {nodemapSettings.unreadMessageCountVisible && unreadMessageCount ? (
                  <div
                    onClick={() => handleQuickIconClick(uuid, 'discussions')}
                    className="card flex gap-1 items-center text-white font-semibold bg-primary-discussions border border-border-discussions shadow py-1 px-2 rounded-xl text-xs relative"
                  >
                    {unreadMessageCount}
                    <ChatSquareDots className="thick-icon" />

                    <Dot
                      size={35}
                      className="text-rose-500 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                ) : null}
                {nodemapSettings.flashcardsDueVisible && flashcardsDueCount ? (
                  <div
                    onClick={() => handleQuickIconClick(uuid, 'flashcards')}
                    className="card flex gap-1 items-center text-white font-semibold bg-primary-flashcards border border-border-flashcards shadow py-1 px-2 rounded-xl text-xs relative"
                  >
                    {flashcardsDueCount.count}
                    <Stack className="thick-icon" />
                  </div>
                ) : null}
              </div>

              <div
                className={`text-center gap-1 flex w-full flex-col items-center relative ${
                  isEditing && 'pointer-events-none'
                }`}
              >
                <span
                  className={`font-semibold truncate leading-tight w-full px-2 ${
                    isDefault ? 'max-w-[300px] !text-2xl' : 'max-w-[175px] text-sm'
                  }  `}
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
            {isHovered && isEditing && (
              <HoverIndicators
                uuid={uuid}
                handleCreateLine={handleCreateLine}
                workspaceId={currentWorkspaceId}
              />
            )}
          </div>
        </ContextMenuTrigger>
        {contextMenuOpen && (
          <ContextMenuContent className="w-52">
            {isEditing && (
              <>
                <ContextMenuItem className="flex items-center gap-2" onClick={handleUpdateNode}>
                  <PencilSquare /> Update Node
                </ContextMenuItem>
                <ContextMenuItem
                  className="flex items-center gap-3"
                  onClick={() => onRemoveNode?.(uuid)}
                >
                  <XSquare /> Delete node
                </ContextMenuItem>
              </>
            )}

            {isSubscribed && !isEditing && (
              <>
                <ContextMenuLabel>Set Status</ContextMenuLabel>

                <ContextMenuItem
                  className={`flex items-center gap-3 ${
                    userChannelDetails.status === CompletionStatus.Skip &&
                    'bg-primary hover:!bg-primary !text-white'
                  }`}
                  onClick={(e: MouseEvent) => handleUpdateChannelStatus(CompletionStatus.Skip, e)}
                >
                  <ChevronDoubleRight /> Skip
                </ContextMenuItem>
                <ContextMenuItem
                  className={`flex items-center gap-3 ${
                    userChannelDetails.status === CompletionStatus.InProgress &&
                    'bg-primary hover:!bg-primary !text-white'
                  }`}
                  onClick={(e: MouseEvent) =>
                    handleUpdateChannelStatus(CompletionStatus.InProgress, e)
                  }
                >
                  <PlayCircle /> In progress
                </ContextMenuItem>
                <ContextMenuItem
                  className={`flex items-center gap-3 ${
                    userChannelDetails.status === CompletionStatus.OnHold &&
                    'bg-primary hover:!bg-primary !text-white'
                  }`}
                  onClick={(e: MouseEvent) => handleUpdateChannelStatus(CompletionStatus.OnHold, e)}
                >
                  <Alarm /> On hold
                </ContextMenuItem>
                <ContextMenuItem
                  className={`flex items-center gap-3 ${
                    userChannelDetails.status === CompletionStatus.Complete &&
                    'bg-primary hover:!bg-primary !text-white'
                  }`}
                  onClick={(e: MouseEvent) =>
                    handleUpdateChannelStatus(CompletionStatus.Complete, e)
                  }
                >
                  <StarFill className="text-yellow-400" />
                  Complete
                </ContextMenuItem>
                <ContextMenuSeparator />

                <ContextMenuItem
                  className="flex items-center gap-3"
                  onClick={() => handleApplyToFavorites(uuid)}
                >
                  <Bookmark />
                  Assign to favorites
                </ContextMenuItem>

                <ContextMenuSeparator />

                <ContextMenuItem
                  className="flex items-center gap-3 text-rose-400"
                  onClick={() => handleLeaveChannel(uuid)}
                >
                  <XCircle />
                  Leave node
                </ContextMenuItem>
              </>
            )}

            {!isSubscribed && !isEditing && (
              <ContextMenuItem className="flex items-center gap-3" onClick={() => handleJoin(uuid)}>
                <AlignStart /> Start node
              </ContextMenuItem>
            )}
          </ContextMenuContent>
        )}
      </ContextMenu>
    </>
  );
};

export default observer(Node);
