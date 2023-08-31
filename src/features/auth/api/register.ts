import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { RegistrationData } from '../types';

export const register = async (registrationData: RegistrationData) => {
  try {
    const { data } = await axios.post('/auth/register', registrationData);

    stores.notificationStore.addNotification({
      title: 'Registration successful. Welcome!',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    return console.error(err);
  }
};
