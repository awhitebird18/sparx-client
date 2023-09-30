import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { handleApiError } from '@/utils/handleApiError';

export const inviteUsersToChannel = async (channelId: string, userIds: string[]) => {
  try {
    const { data } = await axios.post(`/channel-management/invite/${channelId}`, userIds);

    stores.notificationStore.addNotification({
      title: 'Users invited',
      description: 'Invited users will now be able to access this channel',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
