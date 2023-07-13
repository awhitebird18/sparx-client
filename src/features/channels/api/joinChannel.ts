import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';

export const joinChannel = async (channelId: string) => {
  try {
    const { data } = await axios.post(`/userchannels/join/${channelId}`);

    stores.notificationStore.addNotification({
      title: 'Channel joined',
      type: NotificationType.SUCCESS,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error joining channel',
      type: NotificationType.ERROR,
    });
  }
};
