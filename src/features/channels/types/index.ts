import { Dayjs } from 'dayjs';
import { ChannelTypes } from './channelEnums';
import { User } from '@/features/users';

export interface CreateChannel {
  name: string;
  type: ChannelTypes;
  icon?: string;
  isPrivate: boolean;
}

export interface ChannelUnread {
  channelId: string;
  unreadCount: number;
}

export interface Channel extends CreateChannel {
  uuid: string;
  channelId: string;
  joinedAt?: Dayjs | null;
  createdAt: Dayjs;
  updatedAt?: Dayjs;
  topic: string;
  description: string;
  sectionId: string;
  isSubscribed?: boolean;
  users: User[];
  lastRead?: Dayjs | string;
  isPrivate: boolean;
  userCount: number;
}

export type UserTyping = {
  userId: string;
  username: string;
  timerId?: NodeJS.Timeout;
};

export type UpdateChannel = Partial<Channel>;
