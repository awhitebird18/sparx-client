import { ChannelType } from '../enums/channelType';
import { Base } from '@/types/base';

export interface Channel extends Base {
  name: string;
  topic?: string;
  description?: string;
  icon?: string;
  isPrivate?: boolean;
  type: ChannelType;
}
