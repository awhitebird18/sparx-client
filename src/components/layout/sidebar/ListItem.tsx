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
import { useNavigate, useParams } from 'react-router-dom';

interface ListitemProps {
  id: string;
  title: string;
  icon?: JSX.Element;
  primary?: boolean;
  isChannel?: boolean;
  disabled?: boolean;
}

const ListItem = ({ id, title, icon, primary, isChannel, disabled }: ListitemProps) => {
  const { sections } = useStore('sectionStore');
  const { setActiveModal } = useStore('modalStore');
  const { updateChannelSection, leaveChannel } = useStore('channelStore');
  const { selectedId, setSelectedId } = useStore('sidebarStore');
  const navigate = useNavigate();

  const params = useParams();
  console.log(params);

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
    navigate(`/app/${id}`);

    setSelectedId(id);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={!isChannel}>
        <div
          onClick={handleClick}
          className={`h-8 w-100 flex items-center ${
            selectedId === id && !disabled ? 'bg-indigo-700 hover:bg-indigo-800 text-white' : ''
          } ${
            !primary ? 'text-muted-foreground' : 'text-secondary-foreground'
          } gap-2 px-2 cursor-pointer rounded-sm overflow-hidden mx-2`}
        >
          <div className="w-6 h-6 rounded-sm flex justify-center items-center">{icon}</div>

          <div className="font-medium">
            {title.charAt(0).toUpperCase()}
            {title.substring(1).toLocaleLowerCase()}
          </div>
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
