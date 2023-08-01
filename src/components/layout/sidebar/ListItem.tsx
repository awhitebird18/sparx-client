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
import { Section } from '@/features/sections';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { validate } from 'uuid';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './itemTypes';

interface ListitemProps {
  id: string;
  title: string;
  icon?: JSX.Element;
  primary?: boolean;
  isChannel?: boolean;
  disabled?: boolean;
}

const ListItem = ({ id, title, primary, isChannel, disabled, icon }: ListitemProps) => {
  const { sections } = useStore('sectionStore');
  const { setTitle } = useStore('notificationStore');
  const { setActiveModal } = useStore('modalStore');
  const {
    updateChannelSection,
    leaveChannel,
    findChannelUnreads,
    clearChannelUnreads,
    setCurrentChannelId,
    findById,
  } = useStore('channelStore');
  const { selectedId, setSelectedId, setSidebarWidth, isSidebarAbsolute } =
    useStore('sidebarStore');
  const navigate = useNavigate();
  const [, dragRef] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: { channelId: id },
    collect: () => ({}),
  }));

  const unreadCount = findChannelUnreads(id)?.unreadCount;

  const isSelected = selectedId === id && !disabled;

  const handleMoveChannel = ({
    channelId,
    sectionId,
  }: {
    channelId?: string;
    sectionId: string;
  }) => {
    if (!channelId) return;

    updateChannelSection(channelId, sectionId);
  };

  const handleLeaveChannel = () => {
    if (!id) return;
    leaveChannel(id);
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
      setCurrentChannelId(undefined);
    } else {
      const channel = findById(id);
      if (channel) {
        setTitle(channel.name);
      }
      setSelectedId(id);
      clearChannelUnreads(id);
    }

    if (isSidebarAbsolute) {
      setSidebarWidth(0);
    }
    navigate(`/app/${id}`);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={!isChannel}>
        <div
          ref={dragRef}
          onClick={handleClick}
          className={`h-8 p-0 px-2 w-full hover:bg-card text-sm justify-between rounded-sm flex items-center cursor-pointer overflow-hidden ${
            isSelected
              ? 'bg-userDark hover:bg-userDark text-white hover:text-white'
              : 'text-muted-foreground'
          } ${primary && !isSelected ? 'text-primary' : ''}`}
        >
          <div className="font-medium whitespace-nowrap text-ellipsis overflow-hidden flex gap-2 items-center w-full">
            <div className="w-6 h-6 min-w-fit flex items-center justify-center flex-shrink-0">
              {icon}
            </div>

            {title.charAt(0).toUpperCase()}
            {title.substring(1).toLocaleLowerCase()}
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
          <ContextMenuSubContent className="w-48">
            <ContextMenuLabel className="text-xs text-muted-foreground">Move to..</ContextMenuLabel>
            {sections.map((section: Section) => (
              <ContextMenuItem
                key={section.uuid}
                onClick={() => handleMoveChannel({ channelId: id, sectionId: section.uuid })}
              >
                {section.name}
              </ContextMenuItem>
            ))}
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
