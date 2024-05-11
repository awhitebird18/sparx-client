import { Reaction } from '@/features/reactions/types';
import { Base } from '@/types/base';

export interface Message extends Base {
  content: string;
  reactions: Reaction[];
  channelId: string;
  userId: string;
  parentId?: string;
  isSystem?: boolean;
  threadCount?: number;
}
