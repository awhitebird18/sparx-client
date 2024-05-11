// useUserSocket.js
import { useEffect } from 'react';
import { useStore } from '@/stores/RootStore';

const useUserStatusSocket = () => {
  const { updateUser } = useStore('userStore');
  const { connectSocket } = useStore('socketStore');

  // Update user
  useEffect(() => {
    connectSocket('update-user-status', (data) => {
      const { userStatus, userId } = data.payload;

      updateUser({ status: userStatus, uuid: userId });
    });
  }, [connectSocket, updateUser]);

  return null;
};

export default useUserStatusSocket;
