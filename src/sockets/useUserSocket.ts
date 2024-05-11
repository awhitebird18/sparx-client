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
    connectSocket('online-users', ({ payload }) => setOnlineUsers(payload.users));
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
    connectSocket('users/new', ({ payload }) => {
      addUser(payload.user);
    });
  }, [connectSocket, addUser]);

  // Update user
  useEffect(() => {
    connectSocket('update-user', (data) => {
      const { user } = data.payload;

      updateUser(user);
    });
  }, [connectSocket, updateUser]);

  // Remove user
  useEffect(() => {
    connectSocket('remove-user', ({ payload }) => removeUser(payload));
  }, [connectSocket, removeUser]);

  return null;
};

export default useUserSocket;
