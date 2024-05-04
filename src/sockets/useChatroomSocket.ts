import { useUserTypingStore } from '@/features/chatroom/hooks/useUserTypingStore';
import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

const useChatroomSocket = () => {
  const { currentUser } = useStore('userStore');
  const { connectSocket } = useStore('socketStore');
  const { addUserTyping, removeUserTyping } = useUserTypingStore();

  // User typing
  useEffect(() => {
    connectSocket('typing', (data) => {
      const { payload } = data;
      if (payload.userId === currentUser?.uuid) return;

      addUserTyping(payload);
    });
  }, [addUserTyping, connectSocket, currentUser]);

  // Remove user typing
  useEffect(() => {
    connectSocket('stopped-typing', (data) => {
      const { payload } = data;
      removeUserTyping(payload.userId);
    });
  }, [removeUserTyping, connectSocket, currentUser]);

  return null;
};

export default useChatroomSocket;
