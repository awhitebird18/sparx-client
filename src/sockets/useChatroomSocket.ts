import { UserTyping } from '@/features/channels/types';
import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

const useChatroomSocket = () => {
  const { currentUser } = useStore('userStore');
  const { connectSocket } = useStore('socketStore');
  const { addUserTyping } = useStore('userTypingStore');

  // User typing
  useEffect(() => {
    return connectSocket('typing', (data: UserTyping) => {
      if (data.userId === currentUser?.uuid) return;

      addUserTyping(data);
    });
  }, [addUserTyping, connectSocket, currentUser]);

  return null;
};

export default useChatroomSocket;
