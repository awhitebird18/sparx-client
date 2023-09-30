import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { handleApiError } from '@/utils/handleApiError';

export const resetPassword = async (email: string) => {
  try {
    const { data } = await axios.post('/auth/reset-password', { email });

    stores.notificationStore.addNotification({
      title: 'Password Reset Initiated',
      description:
        "We've sent an email to the provided address with instructions on how to reset your password. If you don't see the email, please check your spam or junk folder. If you continue to face issues, please contact support.",
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
