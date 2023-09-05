import { Message } from '@/features/messages/types';

export interface Thread {
  rootMessage: Message;
  latestReplies: Message[];
  replyCount: number;
}
