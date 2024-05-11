import { Base } from '@/types/base';
import { StatusDuration } from '../enums';

export interface UserStatus extends Base {
  emoji: string;
  text: string;
  dateExpire: Date;
  duration: StatusDuration;
  isActive: boolean;
}
