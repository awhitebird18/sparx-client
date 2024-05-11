import { User } from '@/features/users/types';

export function isUser(user: User) {
  return user.uuid && user.email && user.firstName && user.lastName;
}
