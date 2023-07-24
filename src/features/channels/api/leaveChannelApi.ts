import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';

export const leaveChannelApi = async (channelId: string) => {
  try {
    const { data } = await axios.delete(`/userchannels/leave/${channelId}`);

    stores.notificationStore.addNotification({
      title: 'Left channel',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error leaving channel',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
