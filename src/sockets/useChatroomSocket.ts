import { UserTyping } from '@/features/channels/types';
import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

const useChatroomSocket = () => {
  const { currentUser } = useStore('userStore');
  const { connectSocket } = useStore('socketStore');
  const { addUserTyping, removeUserTyping } = useStore('userTypingStore');

  // User typing
  useEffect(() => {
    return connectSocket('typing', (data: UserTyping) => {
      if (data.userId === currentUser?.uuid) return;

      addUserTyping(data);
    });
  }, [addUserTyping, connectSocket, currentUser]);

  // Remove user typing
  useEffect(() => {
    return connectSocket('stopped-typing', (data: UserTyping) => {
      removeUserTyping(data.userId);
    });
  }, [removeUserTyping, connectSocket, currentUser]);

  return null;
};

export default useChatroomSocket;
