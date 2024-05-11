import { Base } from '@/types/base';

export interface CreateMesssage extends Base {
  content: string;
  channelId: string;
  userId: string;
  parentId?: string;
  isSystem?: boolean;
}
