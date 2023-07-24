import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';

export const joinChannelApi = async (channelId: string) => {
  try {
    const { data } = await axios.post(`/userchannels/join/${channelId}`);

    stores.notificationStore.addNotification({
      title: 'Channel joined',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error joining channel',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
