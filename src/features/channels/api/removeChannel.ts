import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { handleApiError } from '@/utils/handleApiError';

export const removeChannel = async (channelId: string, workspaceId: string) => {
  try {
    const { data } = await axios.delete(`/channels/${channelId}/${workspaceId}`);

    stores.notificationStore.addNotification({
      title: 'Channel removed',
      type: NotificationType.SUCCESS,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
