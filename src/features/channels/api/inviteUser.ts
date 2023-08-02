import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';

export const inviteUserApi = async (channelId: string, userIds: string[]) => {
  try {
    const { data } = await axios.post(`/userchannels/invite/${channelId}`, userIds);

    stores.notificationStore.addNotification({
      title: 'Users invited',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error inviting users',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
