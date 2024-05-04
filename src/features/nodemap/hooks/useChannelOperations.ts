// useChannelOperations.js
import { useStore } from '@/stores/RootStore';

export function useChannelOperations(uuid: string) {
  const {
    updateChannelApi,
    userChannelData,
    joinChannelApi,
    leaveChannelApi,
    setCurrentChannelUuid,
    currentChannelId,
  } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const { findDefaultSection } = useStore('sectionStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const userChannelDetails = userChannelData.find((el) => el.channelId === uuid);
  const isSubscribed = !!userChannelDetails?.isSubscribed;

  const handleSelectChannel = () => {
    setCurrentChannelUuid(uuid);
  };

  const handleJoin = async () => {
    const defaultSection = findDefaultSection();
    await joinChannelApi({ channelId: uuid, sectionId: defaultSection?.uuid });
  };

  const handleLeaveChannel = async () => {
    await leaveChannelApi(uuid);

    const navHistoryString = window.localStorage.getItem('navigationHistory');
    const historyParsed = navHistoryString && JSON.parse(navHistoryString);
    if (historyParsed?.length && currentChannelId === uuid) {
      setCurrentChannelUuid(historyParsed[historyParsed.length - 2].nodeId);
    }
  };

  const handleRemove = () => {
    setActiveModal({ type: 'RemoveChannelModal', payload: { uuid } });
  };

  const handleUpdate = () => {
    if (!currentWorkspaceId) return;
    setActiveModal({
      type: 'CreateChannelModal',
      payload: {
        channelId: uuid,
        onSubmit: (name: string) => updateChannelApi(uuid, { name }, currentWorkspaceId),
      },
    });
  };

  return {
    isSubscribed,
    handleJoin,
    handleLeaveChannel,
    handleUpdate,
    handleRemove,
    handleSelectChannel,
  };
}
