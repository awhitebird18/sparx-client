import { ChannelType } from '@/features/channels/enums';
import { Reaction } from '@/features/reactions/types';
import { Base } from '@/types/base';

export interface Message extends Base {
  content: string;
  channelId: string;
  type: ChannelType;
  timezone?: string;
  userId: string;
  reactions: Reaction[];
  childMessages?: Message[];
  parentId?: string;
}
