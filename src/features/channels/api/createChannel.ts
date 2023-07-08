import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/stores';
import { CreateChannel } from '..';

export const createChannel = async (createChannel: CreateChannel) => {
  try {
    const { data } = await axios.post('/channels', createChannel);

    stores.notificationStore.addNotification({
      title: 'Channel created',
      type: NotificationType.SUCCESS,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error creating channel',
      type: NotificationType.ERROR,
    });
  }
};
