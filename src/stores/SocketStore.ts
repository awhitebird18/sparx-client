import { action, makeObservable } from 'mobx';
import io, { Socket } from 'socket.io-client';
import { User } from '@/features/users/types';
import { API_URL } from '@/config/api';

const SOCKET_SERVER_URL = API_URL;

type SocketValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

export class SocketStore {
  socket: Socket | undefined = undefined;

  constructor() {
    makeObservable(this, {
      connectToSocketServer: action,
      connectSocket: action,
      disconnectSocket: action,
      emitSocket: action,
    });
  }

  connectToSocketServer = (currentUser: User) => {
    this.socket = io(SOCKET_SERVER_URL, { query: { userId: currentUser?.uuid } });
  };

  connectSocket = (connectionString: string, callback: (value: SocketValue) => void) => {
    if (!this.socket) return;
    this.socket.on(connectionString, callback);

    return () => this?.socket?.off(connectionString);
  };

  disconnectSocket = (connectionString: string) => {
    if (!this.socket) return;
    this.socket.off(connectionString);
  };

  emitSocket = (connectionString: string, value?: unknown) => {
    if (!this.socket) return;

    this.socket.emit(connectionString, value);
  };

  joinRoom = (channelId: string) => {
    if (!this.socket) return;
    this.socket.emit('joinRoom', channelId);
  };

  leaveRoom = (channelId: string) => {
    if (!this.socket) return;
    this.socket.emit('leaveRoom', channelId);
  };
}
