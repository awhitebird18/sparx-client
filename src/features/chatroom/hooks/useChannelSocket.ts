import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';
import { useUserTypingStore } from './useUserTypingStore';

function useChannelSocket() {
  const { joinRoom, leaveRoom } = useStore('socketStore');
  const { fetchChannelUserIdsApi } = useStore('userStore');
  const { clearUsersTyping } = useUserTypingStore();
  const { currentChannelId } = useStore('channelStore');

  useEffect(() => {
    if (!currentChannelId) return;
    joinRoom(currentChannelId);
    fetchChannelUserIdsApi(currentChannelId);

    return () => {
      leaveRoom(currentChannelId);
      clearUsersTyping();
    };
  }, [currentChannelId, joinRoom, leaveRoom, fetchChannelUserIdsApi, clearUsersTyping]);
}

export default useChannelSocket;
