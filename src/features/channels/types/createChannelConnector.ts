import { ConnectionSide } from '../enums/connectionSide';

export interface CreateChannelConnector {
  parentChannelId: string;
  childChannelId: string;
  parentSide: ConnectionSide;
  childSide: ConnectionSide;
}
