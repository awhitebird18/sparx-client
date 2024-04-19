import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import { useStore } from '@/stores/RootStore';
import { updateUserChannel } from '@/features/channels/api/updateUserChannel';
import {
  Alarm,
  AlignStart,
  BookmarkCheckFill,
  ChevronDoubleRight,
  HandIndexFill,
  InfoCircle,
  Pencil,
  PlayCircle,
  StarFill,
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
    updateUserChannelData,
    joinChannelApi,
    currentChannelId,
    leaveChannelApi,
  } = useStore('channelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { setActiveModal } = useStore('modalStore');
  const { setSidePanelComponent } = useStore('sidePanelStore');
  const { directChannelSectionId } = useStore('sectionStore');
  const userChannelDetails = userChannelData.find((el: any) => el.channel.uuid === uuid) ?? {};
  const isSubscribed = userChannelDetails.isSubscribed;

  const updateChannel = async (name: string) => {
    await updateChannelApi(uuid, { name }, currentWorkspaceId);
  };

  const handleUpdateChannelStatus = async (statusVal: CompletionStatus, e: MouseEvent) => {
    e.stopPropagation();
    const channel = await updateUserChannel(uuid, { status: statusVal });
    updateUserChannelData({ uuid: channel.uuid, status: channel.status });
  };

  const handleApplyToFavorites = (channelId: string) => {
    setActiveModal({ type: 'AddChannelToSectionModal', payload: { channelId } });
  };

  const handleJoin = async (channelId: string) => {
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

  return (
    <div
      data-node-id={uuid}
      className="absolute -top-20 left-0 flex gap-2 bg-hover border border-border card rounded-lg shadow-xl p-1 items-center !z-40 !opacity-100"
    >
      <Button
        variant="ghost"
        className="h-10 w-10 text-secondary"
        size="icon"
        onClick={() => setCurrentChannelUuid(uuid)}
      >
        <HandIndexFill size={17} />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-10 w-10 text-secondary"
            size="icon"
            onClick={() => setSidePanelComponent({ type: 'assistant' })}
          >
            <StarFill size={17} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-52">
          <>
            <DropdownMenuLabel>Set Status</DropdownMenuLabel>

            <DropdownMenuItem
              className={`flex items-center gap-3 ${
                userChannelDetails.status === CompletionStatus.Skip &&
                'bg-primary hover:!bg-primary !text-white'
              }`}
              onClick={(e: any) => handleUpdateChannelStatus(CompletionStatus.Skip, e)}
            >
              <ChevronDoubleRight /> Skip
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center gap-3 ${
                userChannelDetails.status === CompletionStatus.InProgress &&
                'bg-primary hover:!bg-primary !text-white'
              }`}
              onClick={(e: any) => handleUpdateChannelStatus(CompletionStatus.InProgress, e)}
            >
              <PlayCircle /> In progress
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center gap-3 ${
                userChannelDetails.status === CompletionStatus.OnHold &&
                'bg-primary hover:!bg-primary !text-white'
              }`}
              onClick={(e: any) => handleUpdateChannelStatus(CompletionStatus.OnHold, e)}
            >
              <Alarm /> On hold
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center gap-3 ${
                userChannelDetails.status === CompletionStatus.Complete &&
                'bg-primary hover:!bg-primary !text-white'
              }`}
              onClick={(e: any) => handleUpdateChannelStatus(CompletionStatus.Complete, e)}
            >
              <StarFill className="text-yellow-400" />
              Complete
            </DropdownMenuItem>
          </>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="ghost"
        className="h-10 w-10 text-secondary"
        size="icon"
        onClick={() => handleApplyToFavorites(uuid)}
      >
        <BookmarkCheckFill size={17} />
      </Button>
      <Button
        variant="ghost"
        className="h-10 w-10"
        size="icon"
        onClick={() => setSidePanelComponent({ type: 'assistant' })}
      >
        <Logo size={7} />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-0 w-10 h-10" variant="outline" size="icon">
            <ThreeDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40 p-2">
          {isSubscribed ? (
            <DropdownMenuItem
              className="flex items-center gap-3"
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
            className="gap-3 h-10 px-3"
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
            className="gap-3 h-10 px-3"
            onClick={() => {
              if (!currentWorkspaceId) return;
              setActiveModal({ type: 'RemoveChannelModal', payload: { uuid } });
            }}
          >
            <Trash /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3 h-10 px-3">
            <InfoCircle /> Info
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

export default NodePanel;
