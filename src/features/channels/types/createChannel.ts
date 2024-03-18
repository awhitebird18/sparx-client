import { ChannelType } from '../enums/channelType';

export interface CreateChannel {
  name: string;
  type: ChannelType;
  isPrivate?: boolean;
  isDefault?: boolean;
  x?: number;
  y?: number;
}
