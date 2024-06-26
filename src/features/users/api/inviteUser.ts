import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { InviteUser } from '../../auth/types';
import { handleApiError } from '@/utils/handleApiError';

export const inviteUser = async (inviteUser: InviteUser): Promise<void> => {
  try {
    await axios.post('/user-workspaces/send-invite', inviteUser);

    stores.notificationStore.addNotification({
      title: 'User invites sent',
      type: NotificationType.SUCCESS,
      show: true,
    });
  } catch (error) {
    return handleApiError(error);
  }
};
