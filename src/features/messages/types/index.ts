import { BaseEntity } from '@/types';

export type Message = {
  content: string;
  channelId: string;
  timezone?: string;
  userId: string;
} & BaseEntity;

export type CreateMesssage = Partial<Message>;

export type UpdateMessage = {
  content: string;
};
