import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { stores } from '@/stores/RootStore';
import { NotificationType } from '@/stores/NotificationStore';

import { User } from '../types';

export const updateUser = async (userId: string, updateUser: Partial<User>): Promise<User> => {
  try {
    const res = await axios.patch(`/users/${userId}`, updateUser);

    stores.notificationStore.addNotification({
      title: 'Profile updated',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching users');
  }
};
