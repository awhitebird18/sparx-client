import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';

export const changePassword = async (password: string, token: string) => {
  try {
    const { data } = await axios.post('/auth/change-password', { password, token });

    stores.notificationStore.addNotification({
      title: 'Password change successful!',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Something went wrong!',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
