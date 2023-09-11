import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';

export const changePassword = async (changePasswordDto: {
  password: string;
  token?: string;
  email?: string;
}) => {
  try {
    const { data } = await axios.post('/auth/change-password', changePasswordDto);

    stores.notificationStore.addNotification({
      title: 'Success!',
      description:
        "Your password has been changed successfully, and you've been logged in automatically. Please ensure you remember your new password for future logins.",
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error!',
      description:
        'We encountered an issue changing your password. Please try again or contact support if the problem persists.',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
