import { axios } from '@/lib/axios';
import { RegistrationData } from '../types';
import { handleApiError } from '@/utils/handleApiError';
import { User } from '@/features/users/types';

export const register = async (registrationData: RegistrationData): Promise<User> => {
  try {
    const { data } = await axios.post('/auth/register', registrationData);

    // stores.notificationStore.addNotification({
    //   title: 'Email verification sent!',
    //   description:
    //     'Please check your email for a verification link to complete the signup process.',
    //   type: NotificationType.SUCCESS,
    //   show: true,
    // });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
