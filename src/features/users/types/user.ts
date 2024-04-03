import { UserPreferences } from '@/features/preferences/types';
import { UserStatus } from '@/features/userStatus/types/userStatus';
import { Base } from '@/types/base';

export interface User extends Base {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  isBot: boolean;
  isAdmin?: boolean;
  status?: UserStatus;
  preferences: UserPreferences;
}
