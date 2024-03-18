import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { handleApiError } from '@/utils/handleApiError';

export const updateNodePosition = async (channelId: string, position: { x: number; y: number }) => {
  try {
    const { data } = await axios.patch(`/channels/${channelId}/position`, position);

    stores.notificationStore.addNotification({
      title: 'Position updated',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
