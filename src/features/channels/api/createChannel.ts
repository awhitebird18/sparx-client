import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';
import { CreateChannel } from '..';

export const createChannel = async (createChannel: CreateChannel) => {
  try {
    const { data } = await axios.post('/channels', createChannel);

    stores.notificationStore.addNotification({
      title: 'Channel created',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error creating channel',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
