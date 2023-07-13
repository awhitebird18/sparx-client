import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';

export const updateChannelSection = async (channelId: string, sectionId: string) => {
  try {
    const { data } = await axios.patch(`/userchannels/move/${channelId}`, { sectionId });

    stores.notificationStore.addNotification({
      title: 'Channel updated',
      type: NotificationType.SUCCESS,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error updating channel',
      type: NotificationType.ERROR,
    });
  }
};
