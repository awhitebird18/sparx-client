import { StatusDuration } from '../enums';

export interface CreateUserStatus {
  emoji: string;

  text: string;

  dateExpire: Date;

  duration: StatusDuration;
}
