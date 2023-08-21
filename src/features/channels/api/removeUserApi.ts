import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';

export const removeUserApi = async (channelId: string, userId: string) => {
  try {
    const { data } = await axios.delete(`/channel-subscriptions/remove/${channelId}/${userId}`);

    stores.notificationStore.addNotification({
      title: 'User remove from channel',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error removing user',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
