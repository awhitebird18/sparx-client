import { action, makeObservable } from 'mobx';
import io, { Socket } from 'socket.io-client';

import { User } from '@/features/users/types';

const SOCKET_SERVER_URL = 'http://localhost:3000';

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
  emitSocket = (connectionString: string, value: any) => {
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
