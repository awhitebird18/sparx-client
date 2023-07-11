import socketIOClient from 'socket.io-client';
import { dispatchEvent } from '@/events/eventHandler';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // replace with your server URL

export class SocketStore {
  socket;

  constructor() {
    this.socket = socketIOClient(SOCKET_SERVER_URL);

    this.socket.on('channelUpdate', (data) => {
      dispatchEvent('channelUpdate', data);
    });
  }
}
