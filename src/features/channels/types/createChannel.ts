import { ChannelType } from '../enums/channelType';

export interface CreateChannel {
  name: string;
  type: ChannelType;
  isPrivate?: boolean;
}
