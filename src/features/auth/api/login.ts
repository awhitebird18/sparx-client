import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';
import { LoginCredentials } from '..';

export const login = async (loginCredentials: LoginCredentials) => {
  try {
    const { data } = await axios.post('/auth/login', loginCredentials);

    stores.notificationStore.addNotification({
      title: 'Welcome',
      type: NotificationType.SUCCESS,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Something went wrong!',
      type: NotificationType.ERROR,
    });
  }
};
