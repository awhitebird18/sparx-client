import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const SocketController = () => {
  const { setOnlineUsers } = useStore('userStore');
  const { connectSocket, disconnectSocket, emitSocket } = useStore('socketStore');
  const { currentChannelId } = useStore('channelStore');
  const { handleNewMessageSocket } = useStore('messageStore');
  const { addSection } = useStore('sectionStore');

  // Receives list of online users.
  useEffect(() => {
    return connectSocket('online-users', setOnlineUsers);
  }, [connectSocket, setOnlineUsers]);

  // Sets user heartbeat. Used in user online status.
  useEffect(() => {
    setInterval(() => emitSocket('heartbeat', setOnlineUsers), 10000);
  }, [connectSocket, disconnectSocket, emitSocket, setOnlineUsers]);

  // Handles new chatroom message.
  useEffect(() => {
    return connectSocket(`messages/${currentChannelId}`, handleNewMessageSocket);
  }, [connectSocket, currentChannelId, disconnectSocket, handleNewMessageSocket]);

  // Handles new section
  useEffect(() => {
    return connectSocket(`sections`, addSection);
  }, [addSection, connectSocket]);

  return null;
};

export default observer(SocketController);
