import { axios } from '@/lib/axios';

import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';

export const moveChannelSection = async (sectionUuid: string, channelUuid: string) => {
  try {
    const { data } = await axios.patch('/sections/move-channel', {
      sectionId: sectionUuid,
      channelId: channelUuid,
    });

    stores.notificationStore.addNotification({
      title: 'Section created',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    return stores.notificationStore.addNotification({
      title: 'Error creating section',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
