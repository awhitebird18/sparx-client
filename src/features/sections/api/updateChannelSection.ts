import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';

export const updateChannelSection = async (channelId: string, sectionId: string) => {
  try {
    const { data } = await axios.patch(`/channel-subscriptions/move/${channelId}`, { sectionId });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error updating section',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};