import { BaseEntity } from '@/types';

export type Reaction = {
  emojiId: string;
  messageId: string;
  userId: string;
} & BaseEntity;

export type CreateReaction = Partial<Reaction>;

export type UpdateReaction = Partial<Reaction>;
