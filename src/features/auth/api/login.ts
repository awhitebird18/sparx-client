import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { LoginData } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const login = async (loginData: LoginData) => {
  try {
    const { data } = await axios.post('/auth/login', loginData);

    stores.notificationStore.addNotification({
      title: 'Welcome back!',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
