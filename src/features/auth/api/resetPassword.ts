import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';

export const resetPassword = async (email: string) => {
  try {
    const { data } = await axios.post('/auth/reset-password', { email });

    stores.notificationStore.addNotification({
      title: 'Welcome back!',
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
