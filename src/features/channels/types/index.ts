import { Dayjs } from 'dayjs';
import { ChannelTypes } from './channelEnums';
import { User } from '@/features/users';

export interface CreateChannel {
  name: string;
  type: ChannelTypes;
  icon?: string;
}

export interface Channel extends CreateChannel {
  uuid: string;
  joinedAt?: Dayjs | null;
  createdAt: Dayjs;
  topic: string;
  description: string;
  sectionId: string;
  isSubscribed?: boolean;
  users: User[];
}

export type UpdateChannel = Partial<Channel>;
