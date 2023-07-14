import { User } from '@/features/users';
import { BaseEntity } from '@/types';

export type Message = {
  content: string;
  userId: string;
  channelId: string;
  timezone: string;
  user?: User;
} & BaseEntity;

export type UpdateMessage = {
  uuid: string;
  content: string;
};
