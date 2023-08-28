import { UserStatus } from '../enums';

export interface OnlineUser {
  userId: string;
  status: UserStatus;
}
