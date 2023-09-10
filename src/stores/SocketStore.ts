import { action, makeObservable } from 'mobx';
import io, { Socket } from 'socket.io-client';

import { User } from '@/features/users/types';
import { API_URL } from '@/config/api';

const SOCKET_SERVER_URL = API_URL;

export class SocketStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: Socket | any;

  constructor() {
    makeObservable(this, {
      connectToSocketServer: action,
      connectSocket: action,
      disconnectSocket: action,
      emitSocket: action,
    });
  }

  connectToSocketServer = (currentUser: User) => {
    console.log(SOCKET_SERVER_URL);
    this.socket = io(SOCKET_SERVER_URL, { query: { userId: currentUser?.uuid } });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connectSocket = (connectionString: string, callback: (value: any) => void) => {
    if (!this.socket) return;
    this.socket.on(connectionString, callback);

    return () => this.socket.off(connectionString);
  };

  disconnectSocket = (connectionString: string) => {
    if (!this.socket) return;
    this.socket.off(connectionString);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emitSocket = (connectionString: string, value?: any) => {
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
