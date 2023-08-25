import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { stores } from '@/stores/RootStore';
import { NotificationType } from '@/stores/NotificationStore';

import { User } from '@/features/users/types';

export const uploadProfileImage = async (userId: string, profileImage: string): Promise<User> => {
  try {
    const res = await axios.patch(`/users/${userId}/image-upload`, { profileImage });

    stores.notificationStore.addNotification({
      title: 'Profile image updated',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching users');
  }
};
