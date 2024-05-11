import { Base } from '@/types/base';
import { ChannelSubscription } from './channelSubscription';
import { CompletionStatus } from '../enums/completionStatus';

export interface Channel extends Base {
  name: string;
  topic?: string;
  description?: string;
  icon?: string;
  isDefault?: boolean;
  isPrivate?: boolean;
  isTemp?: boolean;
  x: number;
  y: number;
  status: CompletionStatus;
  isSubscribed: boolean;
  subscriptionDetails: ChannelSubscription;
  parentChannelId?: string;
  childChannelIds?: string[];
}
