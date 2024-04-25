import { ActivityTypeEnum } from './activityType';
import { Base } from '@/types/base';

export interface Activity extends Base {
  referenceId?: string;
  text: string;
  type: ActivityTypeEnum;
  userId: string;
}
