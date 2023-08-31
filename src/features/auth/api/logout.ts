import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';

export const logout = async () => {
  try {
    const { data } = await axios.post('/auth/logout');

    stores.notificationStore.addNotification({
      title: 'Logged out successfully!',
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
