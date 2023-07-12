import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';
import { RegistrationData } from '..';

export const register = async (registrationData: RegistrationData) => {
  try {
    const { data } = await axios.post('/auth/register', registrationData);

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
