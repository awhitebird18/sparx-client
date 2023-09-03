import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { validate } from 'uuid';
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
  ContextMenuCheckboxItem,
  ContextMenuLabel,
} from '@/components/ui/ContextMenu';
import { ChannelType } from '@/features/channels/enums';

interface ListitemProps {
  id: string;
  title: string;
  icon?: JSX.Element;
  primary?: boolean;
  isChannel?: boolean;
  disabled?: boolean;
  isTemp?: boolean;
  type?: ChannelType;
}

const ListItem = ({ id, title, isTemp, isChannel, disabled, icon, type }: ListitemProps) => {
  const { currentUser } = useStore('userStore');
  const { sections, updateChannelSectionApi } = useStore('sectionStore');
  const { setTitle } = useStore('notificationStore');
  const { createMessageApi, formatAutomatedMessage } = useStore('messageStore');
  const { setActiveModal } = useStore('modalStore');
  const { leaveChannelApi, setCurrentChannelUuid, findChannelByUuid, filterTempChannels } =
    useStore('channelStore');
  const { findChannelUnreads, clearChannelUnreads } = useStore('channelUnreadStore');
  const { selectedId, setSelectedId, setSidebarWidth, isSidebarAbsolute } =
    useStore('sidebarStore');
  const navigate = useNavigate();
  const [, dragRef] = useDrag(() => ({
    type: SidebarItem.ITEM,
    item: { id, type: SidebarItem.ITEM, channelType: type },
    collect: () => ({}),
  }));

  const conditionalDragRef = isTemp ? null : dragRef;

  const unreadCount = findChannelUnreads(id)?.unreadCount;

  const isSelected = selectedId === id && !disabled;

  const handleMoveChannel = async ({
    channelId,
    sectionId,
  }: {
    channelId: string;
    sectionId: string;
  }) => {
    await updateChannelSectionApi(sectionId, channelId);
  };

  const handleLeaveChannel = async () => {
    if (!id || !currentUser) return;
    await leaveChannelApi(id);

    const formattedMessage = formatAutomatedMessage({
      userId: currentUser.uuid,
      channelId: id,
      content: `has left the channel.`,
    });

    await createMessageApi(formattedMessage);
    navigate(`/app`);
  };

  const handleOpenChannelDetails = () => {
    if (!id) return;
    setActiveModal({
      type: 'ChannelDetailsModal',
      payload: { id, defaultTab: 'about' },
    });
  };

  const handleClick = () => {
    const isChannel = validate(id);

    if (!isChannel) {
      setTitle(`${id.charAt(0).toUpperCase()}${id.substring(1)}`);
      setCurrentChannelUuid(undefined);
    } else {
      const channel = findChannelByUuid(id);
      if (channel) {
        setTitle(channel.name);
      }
      setSelectedId(id);
      clearChannelUnreads(id);
    }
    filterTempChannels();

    if (isSidebarAbsolute) {
      setSidebarWidth(0);
    }
    navigate(`/app/${id}`);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={!isChannel}>
        <div
          ref={conditionalDragRef}
          onClick={handleClick}
          className={`h-8 p-0 px-3 w-full hover:bg-card text-sm justify-between rounded-sm flex items-center cursor-pointer overflow-hidden ${
            isSelected
              ? 'bg-userMedium hover:bg-userMedium text-white hover:text-white'
              : 'text-neutral'
          } ${'text-neutral'}`}
        >
          <div className="font-medium whitespace-nowrap text-ellipsis overflow-hidden flex gap-2 items-center w-full h-full">
            <div className="w-6 h-6 min-w-fit flex items-center justify-center flex-shrink-0">
              {icon}
            </div>

            {title}
          </div>
          {unreadCount ? (
            <Badge
              itemType="div"
              variant="outline"
              className="text-sm p-0 w-7 h-5 justify-center items-center bg-userDark border-transparent outline-transparent border-none text-white shadow-inner shadow-userDark rounded-xl"
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
          <ContextMenuSubTrigger inset>Copy</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Copy name</ContextMenuItem>
            <ContextMenuItem>Copy link</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Mute channel</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Move channel</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48 ">
            <ContextMenuLabel className="text-xs text-muted-foreground">Move to..</ContextMenuLabel>
            <div className="max-h-48 overflow-auto">
              {sections.map((section: Section) => (
                <ContextMenuItem
                  key={section.uuid}
                  onClick={() => handleMoveChannel({ channelId: id, sectionId: section.uuid })}
                >
                  {section.name}
                </ContextMenuItem>
              ))}
            </div>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem inset className="text-rose-500" onClick={handleLeaveChannel}>
          Leave Channel
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default observer(ListItem);
