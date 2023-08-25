import { axios } from '@/lib/axios';

import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';

import { Channel } from '../types';

export const updateUserChannel = async (channelId: string, updateFields: Partial<Channel>) => {
  try {
    const { data } = await axios.patch(`/channel-subscriptions/${channelId}`, updateFields);

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error updating channel',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
