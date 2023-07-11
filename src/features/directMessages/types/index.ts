import { Dayjs } from 'dayjs';
import { ChannelTypes } from './channelEnums';

export interface CreateChannel {
  name: string;
  type: ChannelTypes;
}

export interface Channel extends CreateChannel {
  uuid: string;
  joinedAt?: Dayjs | null;
  createdAt: Dayjs;
  topic: string;
  description: string;
  image?: string;
}

export interface UpdateChannel extends Partial<Channel> {
  uuid: string;
}
