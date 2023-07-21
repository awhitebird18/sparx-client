import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';
import { Channel } from '..';

export const updateChannelApi = async (channelId: string, updateFields: Partial<Channel>) => {
  try {
    const { data } = await axios.patch(`/channels/${channelId}`, updateFields);

    stores.notificationStore.addNotification({
      title: 'Channel updated',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error updating channel',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
