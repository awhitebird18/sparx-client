import { axios } from '@/lib/axios';
import { stores } from '@/stores/RootStore';
import { NotificationType } from '@/stores/NotificationStore';

import { User } from '@/features/users/types';
import { handleApiError } from '@/utils/handleApiError';

export const uploadProfileImage = async (profileImage: string): Promise<User> => {
  try {
    const res = await axios.patch(`/users/self/image-upload`, { profileImage });

    stores.notificationStore.addNotification({
      title: 'Profile image updated',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
