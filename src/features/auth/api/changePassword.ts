import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { handleApiError } from '@/utils/handleApiError';

export const changePassword = async (changePasswordDto: {
  password: string;
  token?: string;
  email?: string;
}) => {
  try {
    const { data } = await axios.post('/auth/change-password', changePasswordDto);

    stores.notificationStore.addNotification({
      title: 'Success!',
      description: 'Your password has been changed successfully.',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
