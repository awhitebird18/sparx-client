import { StatusDuration } from '../enums';

export interface UpdateUserStatus {
  emoji?: string;

  text?: string;

  dateExpire?: Date;

  duration?: StatusDuration;

  isActive?: boolean;
}
