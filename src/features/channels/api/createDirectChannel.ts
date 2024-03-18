import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { handleApiError } from '@/utils/handleApiError';

export const createDirectChannel = async (memberIds: string[], workspaceId: string) => {
  try {
    const { data } = await axios.post('/channel-management/direct-channel', {
      memberIds,
      workspaceId,
    });

    stores.notificationStore.addNotification({
      title: 'Channel created',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
