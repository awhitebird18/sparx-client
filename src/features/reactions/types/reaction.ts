import { Base } from '@/types/base';

export interface Reaction extends Base {
  emojiId: string;
  messageId: string;
  userId: string;
}
