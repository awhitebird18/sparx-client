import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useStore } from '@/stores/RootStore';
import {
  AlignStart,
  BookmarkCheck,
  HandIndex,
  InfoCircle,
  Magic,
  Pencil,
  ThreeDots,
  Trash,
} from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';
import { useChannelOperations } from '../hooks/useChannelOperations';
import NodePanelButton from './NodePanelButton';
import NodeStatusDropdown from './NodeStatusDropdown';

type Props = { uuid: string };

const NodePanel = observer(({ uuid }: Props) => {
  const { setActiveModal } = useStore('modalStore');
  const { setSidePanelComponent } = useStore('sidePanelStore');
  const {
    handleJoin,
    handleLeaveChannel,
    handleUpdate,
    isSubscribed,
    handleRemove,
    handleSelectChannel,
  } = useChannelOperations(uuid);

  const handleApplyToFavorites = (channelId: string) => {
    setActiveModal({ type: 'AddChannelToSectionModal', payload: { channelId } });
  };

  return (
    <div
      data-node-id={uuid}
      className="card-base !shadow-md border-gray-300 !shadow-black/30 !dark:bg-card-hover dark:border-slate-300/20 absolute -top-16 left-0 flex gap-2 p-1 items-center z-50"
    >
      <NodePanelButton isSubscribed={isSubscribed} onClick={handleSelectChannel}>
        <HandIndex size={20} />
      </NodePanelButton>

      <NodePanelButton isSubscribed={isSubscribed} onClick={() => handleApplyToFavorites(uuid)}>
        <BookmarkCheck size={19} />
      </NodePanelButton>

      <NodeStatusDropdown uuid={uuid} />

      <NodePanelButton
        isSubscribed={isSubscribed}
        onClick={() => setSidePanelComponent({ type: 'assistant' })}
      >
        <Magic size={19} />
      </NodePanelButton>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <NodePanelButton isSubscribed>
            <ThreeDots size={20} />
          </NodePanelButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" sideOffset={8} className="w-40 p-1">
          <DropdownMenuItem
            className="flex items-center gap-4 px-2"
            onClick={isSubscribed ? handleLeaveChannel : handleJoin}
          >
            {isSubscribed ? <AlignStart /> : <AlignStart />}
            {isSubscribed ? 'Leave channel' : 'Join channel'}
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-4 h-9 px-2" onClick={handleUpdate}>
            <Pencil /> Edit
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-4 h-9 px-2" onClick={handleRemove}>
            <Trash /> Delete
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-4 h-9 px-2">
            <InfoCircle /> Info
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

export default NodePanel;
