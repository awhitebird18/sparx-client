import { UserStatus } from './enums';

export type User = {
  address?: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  primaryColor: string;
  profileImage: string;
  theme: string;
  uuid: string;
  status: UserStatus;
  isBot?: boolean;
};
