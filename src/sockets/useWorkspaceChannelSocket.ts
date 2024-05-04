import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

const useWorkspaceChannelSocket = () => {
  const { connectSocket } = useStore('socketStore');
  const { removeSubscribedChannel, updateChannelUserCount } = useStore('channelStore');

  // Update channel count
  useEffect(() => {
    connectSocket('update-channel-user-count', (data) => {
      const { channelUserCount } = data.payload;

      updateChannelUserCount(channelUserCount);
    });
  }, [connectSocket, updateChannelUserCount]);

  // Remove workspace channel
  useEffect(() => {
    connectSocket(`channels/remove`, ({ payload }) => removeSubscribedChannel(payload.uuid));
  }, [connectSocket, removeSubscribedChannel]);

  return null;
};

export default useWorkspaceChannelSocket;
