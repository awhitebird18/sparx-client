import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const SocketController = () => {
  const { setOnlineUsers } = useStore('userStore');
  const { connectSocket, disconnectSocket, emitSocket } = useStore('socketStore');
  const { currentChannelId } = useStore('channelStore');
  const { handleNewMessageSocket, handleDeleteMessageSocket, handleUpdateMessageSocket } =
    useStore('messageStore');
  const { handleUpdateUserSocket, handleNewUserSocket, handleRemoveserSocket } =
    useStore('userStore');
  const { addSection, handleUpdateSectionSocket, deleteSection } = useStore('sectionStore');

  /* User Sockets */
  // Online users
  useEffect(() => {
    return connectSocket('online-users', setOnlineUsers);
  }, [connectSocket, setOnlineUsers]);

  // User heartbeat
  useEffect(() => {
    setInterval(() => emitSocket('heartbeat', setOnlineUsers), 10000);
  }, [connectSocket, disconnectSocket, emitSocket, setOnlineUsers]);

  // New user
  useEffect(() => {
    return connectSocket('users/update', handleNewUserSocket);
  }, [connectSocket, handleNewUserSocket]);

  // Update user
  useEffect(() => {
    return connectSocket('users/update', handleUpdateUserSocket);
  }, [connectSocket, handleUpdateUserSocket]);

  // Remove user
  useEffect(() => {
    return connectSocket('users/remove', handleRemoveserSocket);
  }, [connectSocket, handleRemoveserSocket]);

  /* Message Sockets */
  // New message
  useEffect(() => {
    return connectSocket(`messages/${currentChannelId}`, handleNewMessageSocket);
  }, [connectSocket, currentChannelId, disconnectSocket, handleNewMessageSocket]);

  // Update message
  useEffect(() => {
    return connectSocket(`messages/${currentChannelId}/update`, handleUpdateMessageSocket);
  }, [connectSocket, currentChannelId, handleUpdateMessageSocket]);

  // Remove message
  useEffect(() => {
    return connectSocket(`messages/${currentChannelId}/remove`, handleDeleteMessageSocket);
  }, [connectSocket, currentChannelId, handleDeleteMessageSocket, handleNewMessageSocket]);

  /* Section Sockets */
  // New section
  useEffect(() => {
    return connectSocket(`sections`, addSection);
  }, [connectSocket, addSection]);

  // Update section
  useEffect(() => {
    return connectSocket(`sections/update`, handleUpdateSectionSocket);
  }, [connectSocket, handleUpdateSectionSocket]);

  // Remove section
  useEffect(() => {
    return connectSocket(`sections/remove`, deleteSection);
  }, [connectSocket, deleteSection]);

  return null;
};

export default observer(SocketController);
