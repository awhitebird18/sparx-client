import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';

import { SidebarItem } from './enums/itemTypes';
import { Section } from '@/features/sections/types';
import { useStore } from '@/stores/RootStore';

import { Badge } from '@/components/ui/Badge';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuSeparator,
  ContextMenuLabel,
} from '@/components/ui/ContextMenu';
import { ChannelType } from '@/features/channels/enums';
import { UserStatus } from '@/features/userStatus/types/userStatus';
import UserStatusDisplay from '@/features/userStatus/components/UserStatusDisplay';
import { Lock } from 'react-bootstrap-icons';

interface ListitemProps {
  id: string;
  sectionId?: string;
  title: string;
  icon?: JSX.Element;
  primary?: boolean;
  isChannel?: boolean;
  disabled?: boolean;
  isTemp?: boolean;
  type?: ChannelType;
  status?: UserStatus;
  isPrivate?: boolean;
}

const ListItem = ({
  id,
  sectionId,
  title,
  isTemp,
  isChannel,
  disabled,
  icon,
  type,
  status,
  isPrivate,
}: ListitemProps) => {
  const { setCurrentChannelUuid } = useStore('channelStore');
  const { sections, updateChannelSectionApi } = useStore('sectionStore');

  const { setActiveModal } = useStore('modalStore');

  const { findChannelUnreads } = useStore('channelUnreadStore');
  const { selectedId, sidebarOpen } = useStore('sidebarStore');
  const navigate = useNavigate();

  const [, dragRef] = useDrag(() => ({
    type: SidebarItem.ITEM,
    item: { id, type: SidebarItem.ITEM, channelType: type, sectionId: sectionId },
    collect: () => ({}),
  }));

  const conditionalDragRef = isTemp ? null : dragRef;

  const unreadCount = findChannelUnreads(id)?.unreadCount;

  const isSelected = selectedId === id && !disabled;

  const handleMoveChannel = async ({
    channelId,
    selectedSectionId,
  }: {
    channelId: string;
    selectedSectionId: string;
  }) => {
    if (!sectionId || sectionId === selectedSectionId) return;

    await updateChannelSectionApi(selectedSectionId, channelId);
  };

  // const handleLeaveChannel = async () => {
  //   if (!id || !currentUser) return;
  //   await leaveChannelApi(id);

  //   const formattedMessage = formatAutomatedMessage({
  //     userId: currentUser.uuid,
  //     channelId: id,
  //     content: `has left the channel.`,
  //   });

  //   await createMessageApi(formattedMessage);
  //   navigate(`/app`);
  // };

  const handleRemoveChannelFromSection = async () => {
    await updateChannelSectionApi(undefined, id);
  };

  const handleOpenChannelDetails = () => {
    if (!id) return;
    setActiveModal({
      type: 'ChannelDetailsModal',
      payload: { id, defaultTab: 'about' },
    });
  };

  const handleClick = () => {
    // if (isSidebarAbsolute) {
    //   setSidebarWidth(0);
    // }

    if (isChannel) {
      setCurrentChannelUuid(id);
    } else {
      navigate(`/app/${id}`);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={!isChannel}>
        <div
          ref={conditionalDragRef}
          onClick={handleClick}
          className={`h-9 ${
            !sidebarOpen && 'w-full'
          } p-0 px-3.5 relative justify-between flex items-center cursor-pointer overflow-hidden hover:bg-hover ${
            isChannel ? '!text-secondary' : 'text-secondary'
          } ${
            isSelected &&
            'activeListItem !bg-primary-transparent border-primary text-black dark:text-white'
          } ${disabled ? 'text-muted' : 'font-normal'}`}
        >
          <div
            className={`whitespace-nowrap font-medium text-ellipsis overflow-hidden flex gap-2 items-center w-full h-full text-sm`}
          >
            <div className="w-9 h-9 min-w-fit flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            {sidebarOpen && <div className="truncate">{title}</div>}
            {isPrivate && <Lock />}
            <div className="overflow-hidden">
              {status?.isActive && <UserStatusDisplay status={status} />}
            </div>
          </div>
          {unreadCount ? (
            <Badge
              itemType="div"
              variant="outline"
              className="p-0 w-7 h-5 justify-center items-center bg-primary-dark border-transparent outline-transparent border-none text-white shadow-inner shadow-primary-dark rounded-xl"
            >
              {unreadCount}
            </Badge>
          ) : null}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={handleOpenChannelDetails}>
          View channel details
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Move channel</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48 ">
            <ContextMenuLabel className="text-xs text-muted-foreground">Move to..</ContextMenuLabel>
            <div className="max-h-48 overflow-auto">
              {sections
                .filter(
                  (section: Section) => section.type === type || section.type === ChannelType.ANY,
                )
                .map((section: Section) => (
                  <ContextMenuItem
                    key={section.uuid}
                    onClick={() =>
                      handleMoveChannel({ channelId: id, selectedSectionId: section.uuid })
                    }
                  >
                    {section.name}
                  </ContextMenuItem>
                ))}
            </div>
          </ContextMenuSubContent>
        </ContextMenuSub>
        {type !== ChannelType.DIRECT && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem
              inset
              className="text-rose-500"
              onClick={handleRemoveChannelFromSection}
            >
              Remove from section
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default observer(ListItem);
