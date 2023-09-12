import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';
import { LoginData } from '../types';

export const login = async (loginData: LoginData) => {
  try {
    const { data } = await axios.post('/auth/login', loginData);

    stores.notificationStore.addNotification({
      title: 'Welcome back!',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    return stores.notificationStore.addNotification({
      title: 'Login Unsuccessful',
      description:
        'Please check your email and password and try again. If you continue to face issues, you might want to reset your password.',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
