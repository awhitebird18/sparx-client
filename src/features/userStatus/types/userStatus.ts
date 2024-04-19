import { StatusDuration } from '../enums';

export interface UserStatus {
  uuid: string;
  createdAt: Date;
  emoji: string;
  text: string;
  dateExpire: Date;
  duration: StatusDuration;
  isActive: boolean;
}
