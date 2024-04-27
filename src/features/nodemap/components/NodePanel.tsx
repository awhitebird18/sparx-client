import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/Button';
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
  Pencil,
  ThreeDots,
  Trash,
} from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';

type Props = { uuid: string };

const NodePanel = observer(({ uuid }: Props) => {
  const {
    setCurrentChannelUuid,
    updateChannelApi,
    userChannelData,
    joinChannelApi,
    currentChannelId,
    leaveChannelApi,
  } = useStore('channelStore');
  const { findDefaultSection } = useStore('sectionStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { setActiveModal } = useStore('modalStore');
  const { setSidePanelComponent } = useStore('sidePanelStore');
  const userChannelDetails = userChannelData.find((el) => el.channelId === uuid);
  const isSubscribed = userChannelDetails?.isSubscribed;

  const updateChannel = async (name: string) => {
    await updateChannelApi(uuid, { name }, currentWorkspaceId);
  };

  const handleApplyToFavorites = (channelId: string) => {
    setActiveModal({ type: 'AddChannelToSectionModal', payload: { channelId } });
  };

  const handleJoin = async (channelId: string) => {
    const defaultSection = findDefaultSection();

    // if (!defaultSection) return;

    await joinChannelApi({ channelId, sectionId: defaultSection?.uuid });
  };

  const handleLeaveChannel = async (channelId: string) => {
    await leaveChannelApi(channelId);
    const navHistoryString = window.localStorage.getItem('navigationHistory');
    const historyParsed = navHistoryString && JSON.parse(navHistoryString);
    if (historyParsed?.length && currentChannelId === channelId) {
      setCurrentChannelUuid(historyParsed[historyParsed.length - 2].nodeId);
    }
  };

  return (
    <div
      data-node-id={uuid}
      className="absolute -top-16 left-0 flex gap-2 bg-card card border border-border card rounded-lg p-1 items-center z-30"
    >
      <Button
        variant="ghost"
        className={`h-12 w-12 text-secondary ${!isSubscribed && 'opacity-40 pointer-events-none'}`}
        size="icon"
        onClick={() => setCurrentChannelUuid(uuid)}
      >
        <HandIndex size={20} />
      </Button>

      {/* Node Status Dropdown */}
      <Button
        variant="ghost"
        className={`h-12 w-12 text-secondary ${!isSubscribed && 'opacity-40 pointer-events-none'}`}
        size="icon"
        onClick={() => handleApplyToFavorites(uuid)}
      >
        <BookmarkCheck size={19} />
      </Button>
      <Button
        variant="ghost"
        className={`h-12 w-12 ${!isSubscribed && 'opacity-40 pointer-events-none'}`}
        size="icon"
        onClick={() => setSidePanelComponent({ type: 'assistant' })}
      >
        <Logo size={7} />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-0 w-12 h-12 text-main" variant="ghost" size="icon">
            <ThreeDots size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40 p-1">
          {isSubscribed ? (
            <DropdownMenuItem
              className="flex items-center gap-4 px-2"
              onClick={() => handleLeaveChannel(uuid)}
            >
              <AlignStart /> Leave node
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="flex items-center gap-3" onClick={() => handleJoin(uuid)}>
              <AlignStart /> Start node
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="gap-4 h-9 px-2"
            onClick={() => {
              if (!currentWorkspaceId) return;
              setActiveModal({
                type: 'CreateChannelModal',
                payload: { channelId: uuid, onSubmit: updateChannel },
              });
            }}
          >
            <Pencil /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-4 h-9 px-2"
            onClick={() => {
              setActiveModal({ type: 'RemoveChannelModal', payload: { uuid } });
            }}
          >
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
