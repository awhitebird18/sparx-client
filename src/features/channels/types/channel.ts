import { ChannelType } from '../enums/channelType';
import { Base } from '@/types/base';

export interface Channel extends Base {
  name: string;
  topic?: string;
  description?: string;
  icon?: string;
  isDefault?: boolean;
  isPrivate?: boolean;
  type: ChannelType;
  isTemp?: boolean;
  x: number;
  y: number;
  status: string;
  isSubscribed: boolean;
  subscriptionDetails: any;
}
