import { Reaction } from '@/features/reactions';
import { BaseEntity } from '@/types';

export type Message = {
  content: string;
  channelId: string;
  timezone?: string;
  userId: string;
  reactions: Reaction[];
  childMessages?: Message[];
  parentMessage?: Message;
  parentMessageId?: string;
} & BaseEntity;

export type CreateMesssage = Partial<Message>;

export type UpdateMessage = {
  content: string;
};
