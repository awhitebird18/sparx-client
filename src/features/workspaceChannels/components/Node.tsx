import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';

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
  onRemoveNode,
  hideUnstarted,
  isDefault,
  handleCreateLine,
  scale,
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

  const handleDrag = useMemo(
    () => ({
      type: 'node',
      item: { uuid, x: x, y: y, name: label },

      collect: (monitor: any) => {
        return {
          isDragging: monitor.isDragging(),
          x: x,
          y: y,
          // We'll now only get the drag state, not set the position here
        };
      },
    }),
    [label, uuid, x, y],
  );

  const [{ isDragging }, drag, preview] = useDrag(handleDrag, [uuid, x, y]);

  useEffect(() => {
    setIsDraggingNode(isDragging);
  }, [isDragging, setIsDraggingNode]);

  useEffect(() => {
    preview(createTransparentImage());
  }, [preview]);

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
              left: x,
              top: y,

              // transform: isDragging ? `scale(${scale})` : '',

              // transformOrigin: 'center',
            }}
            className={`card cursor-pointer z-50 delay-300 transition-colors -translate-x-1/2 -translate-y-1/2 px-4 shadow-md flex flex-col items-start duration-400 absolute justify-center border border-border min-w-[15rem] rounded-lg bg-card text-main ${
              currentChannelId === uuid ? 'bg-primary text-white border-primary' : ''
            } ${isDragging ? 'transition-opacity !opacity-0' : ''} ${
              isSubscribed ? '' : 'opacity-60'
            } ${hideUnstarted && !isSubscribed && 'hidden'} ${
              isDefault ? 'w-[325px] h-[100px] p-6 !rounded-lg' : 'w-fit h-[75px]'
            }`}
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
                className={`node text-center gap-2 flex w-full flex-col ${
                  isEditing && 'pointer-events-none'
                }`}
              >
                <span
                  className={`font-semibold flex truncate whitespace-nowrap leading-tight w-full ${
                    isDefault ? 'max-w-[300px] !text-2xl' : 'max-w-[250px] text-lg'
                  }`}
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
                    {nodemapSettings.userCountVisible && (
                      <div
                        onClick={() => handleQuickIconClick(uuid, 'members')}
                        className="card flex gap-1 items-center text-white font-semibold bg-transparent hover:bg-slate-500/20 border border-border  h-6 w-10 justify-center rounded-md text-xs"
                      >
                        {userCount} <People />
                      </div>
                    )}

                    <div
                      onClick={() => handleQuickIconClick(uuid, 'discussions')}
                      className={`card flex gap-1 items-center text-white font-semibold bg-transparent hover:bg-slate-500/20 border border-border  h-6 w-10 justify-center rounded-md text-xs ${nodemapSettings.unreadMessageCountVisible}`}
                    >
                      {unreadMessageCount}
                      <ChatSquareDots />

                      {unreadMessageCount ? (
                        <Dot
                          size={35}
                          className="text-rose-500 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                        />
                      ) : null}
                    </div>

                    <div
                      onClick={() => handleQuickIconClick(uuid, 'flashcards')}
                      className={`card flex gap-1 items-center text-white font-semibold bg-transparent hover:bg-slate-500/20 border border-border  h-6 w-10 justify-center rounded-md text-xs ${
                        !nodemapSettings.flashcardsDueVisible && 'opacity-0'
                      }`}
                    >
                      {flashcardsDueCount?.count ?? 0}
                      <Stack />
                    </div>
                  </div>
                </div>
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
