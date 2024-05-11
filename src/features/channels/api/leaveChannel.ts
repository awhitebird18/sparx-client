import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { handleApiError } from '@/utils/handleApiError';

export const leaveChannel = async (channelId: string) => {
  try {
    const { data } = await axios.delete(`/channel-subscription/leave/${channelId}`);

    stores.notificationStore.addNotification({
      title: 'Left channel',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
