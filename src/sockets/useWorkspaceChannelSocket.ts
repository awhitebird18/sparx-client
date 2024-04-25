import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

const useWorkspaceChannelSocket = () => {
  const { connectSocket } = useStore('socketStore');
  const { removeWorkspaceChannel, updateChannelUserCount } = useStore('channelStore');

  // Update channel count
  useEffect(() => {
    return connectSocket('update-channel-user-count', (data) => {
      const { channelUserCount } = data.payload;

      updateChannelUserCount(channelUserCount);
    });
  }, [connectSocket, updateChannelUserCount]);

  // Remove workspace channel
  useEffect(() => {
    return connectSocket(`channels/remove`, removeWorkspaceChannel);
  }, [connectSocket, removeWorkspaceChannel]);

  return null;
};

export default useWorkspaceChannelSocket;
