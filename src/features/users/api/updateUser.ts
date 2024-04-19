import { axios } from '@/lib/axios';
import { stores } from '@/stores/RootStore';
import { NotificationType } from '@/stores/NotificationStore';
import { UpdateUser, User } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const updateUser = async (updateUser: UpdateUser): Promise<User> => {
  try {
    const res = await axios.patch(`/users/self`, updateUser);

    stores.notificationStore.addNotification({
      title: 'Profile updated',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
