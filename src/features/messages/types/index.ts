import { ChannelTypes } from '@/features/channels/types/channelEnums';
import { Reaction } from '@/features/reactions';
import { BaseEntity } from '@/types';

export type Message = {
  content: string;
  channelId: string;
  type: ChannelTypes;
  timezone?: string;
  userId: string;
  reactions: Reaction[];
  childMessages?: Message[];
  parentId?: string;
} & BaseEntity;

export type CreateMesssage = Partial<Message>;

export type UpdateMessage = {
  content: string;
};
