import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

const useChannelConnectorSocket = () => {
  const { connectSocket } = useStore('socketStore');
  const { addChannelConnector, removeChannelConnector } = useStore('channelConnectorStore');

  useEffect(() => {
    return connectSocket('create-channel-connector', (data) => {
      addChannelConnector(data.payload);
    });
  }, [addChannelConnector, connectSocket]);

  useEffect(() => {
    return connectSocket('remove-channel-connector', (data) => {
      removeChannelConnector(data.payload.uuid);

      // removeSubscribedChannel(channelId);
      // removeChannelUuidFromSection(channelId);
    });
  }, [connectSocket, removeChannelConnector]);
};

export default useChannelConnectorSocket;
