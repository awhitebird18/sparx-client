import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { RegistrationData } from '../types';

export const register = async (registrationData: RegistrationData) => {
  try {
    const { data } = await axios.post('/auth/register', registrationData);

    stores.notificationStore.addNotification({
      title: 'Email verification sent!',
      description:
        'Please check your email for a verification link to complete the signup process.',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Registration Unsuccessful',
      description:
        'The provided email address is already associated with an account. If this is your email, you can try logging in or use the password reset option.',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
