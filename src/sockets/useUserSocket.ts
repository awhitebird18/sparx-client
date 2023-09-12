// useUserSocket.js
import { useEffect } from 'react';
import { useStore } from '@/stores/RootStore';
import { UserStatus } from '@/features/users/enums';

const useUserSocket = () => {
  const { setOnlineUsers, addUser, updateUser, removeUser, userOnlineStatus, currentUser } =
    useStore('userStore');
  const { emitSocket, connectSocket } = useStore('socketStore');

  useEffect(() => {
    if (!currentUser) return;

    emitSocket('joinSelf', currentUser.uuid);

    return () => emitSocket('leaveSelf', currentUser.uuid);
  }, [currentUser, emitSocket]);

  // Online users
  useEffect(() => {
    return connectSocket('online-users', setOnlineUsers);
  }, [connectSocket, setOnlineUsers]);

  // User heartbeat
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (userOnlineStatus !== UserStatus.OFFLINE) {
      intervalId = setInterval(() => {
        emitSocket('heartbeat', { status: userOnlineStatus });
      }, 10000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [emitSocket, userOnlineStatus]);

  // New user
  useEffect(() => {
    return connectSocket('users/new', addUser);
  }, [connectSocket, addUser]);

  // Update user
  useEffect(() => {
    return connectSocket('update-user', (data) => {
      const { user } = data.payload;

      updateUser(user);
    });
  }, [connectSocket, updateUser]);

  // Remove user
  useEffect(() => {
    return connectSocket('remove-user', removeUser);
  }, [connectSocket, removeUser]);

  return null;
};

export default useUserSocket;
