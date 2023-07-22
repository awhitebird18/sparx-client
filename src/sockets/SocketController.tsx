import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const SocketController = () => {
  const { setOnlineUsers } = useStore('userStore');
  const { connectSocket, disconnectSocket, emitSocket } = useStore('socketStore');
  const { currentChannelId } = useStore('channelStore');
  const { handleNewMessageSocket, handleDeleteMessageSocket, handleUpdateMessageSocket } =
    useStore('messageStore');
  const { addSection } = useStore('sectionStore');

  /* User Sockets */
  // Receives list of online users.
  useEffect(() => {
    return connectSocket('online-users', setOnlineUsers);
  }, [connectSocket, setOnlineUsers]);

  // Sets user heartbeat. Used in user online status.
  useEffect(() => {
    setInterval(() => emitSocket('heartbeat', setOnlineUsers), 10000);
  }, [connectSocket, disconnectSocket, emitSocket, setOnlineUsers]);

  /* Message Sockets */
  // Create and update message
  useEffect(() => {
    return connectSocket(`messages/${currentChannelId}`, handleNewMessageSocket);
  }, [connectSocket, currentChannelId, disconnectSocket, handleNewMessageSocket]);

  // Create and update message
  useEffect(() => {
    return connectSocket(`messages/${currentChannelId}/update`, handleUpdateMessageSocket);
  }, [connectSocket, currentChannelId, handleUpdateMessageSocket]);

  // Removes message
  useEffect(() => {
    return connectSocket(`messages/${currentChannelId}/remove`, handleDeleteMessageSocket);
  }, [connectSocket, currentChannelId, handleDeleteMessageSocket, handleNewMessageSocket]);

  /* Section Sockets */
  // Handles new section
  useEffect(() => {
    return connectSocket(`sections`, addSection);
  }, [addSection, connectSocket]);

  return null;
};

export default observer(SocketController);
