import { User } from '@/features/users';
import { action, makeObservable } from 'mobx';
import io, { Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // replace with your server URL

export class SocketStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: Socket | any; // add this line

  constructor() {
    makeObservable(this, {
      connectToSocketServer: action,
      connectSocket: action,
      disconnectSocket: action,
      emitSocket: action,
    });
  }

  connectToSocketServer = (currentUser: User) => {
    this.socket = io(SOCKET_SERVER_URL, { query: { userId: currentUser.uuid } });
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
}
