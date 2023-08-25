import { Base } from '@/types/base';
import { Dayjs } from 'dayjs';

export interface ChannelSubscription extends Base {
  channelId: string;
  lastRead?: Dayjs;
  isMuted: boolean;
}
