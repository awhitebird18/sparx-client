import { Base } from '@/types/base';
import { CompletionStatus } from '../enums/completionStatus';
import { Dayjs } from 'dayjs';

export interface ChannelSubscription extends Base {
  sectionId: string;
  channelId: string;
  lastRead: string | Dayjs;
  isMuted: boolean;
  isAdmin: boolean;
  isSubscribed: boolean;
  status: CompletionStatus;
  userId: string;
}
