import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/stores';

export const getSections = async () => {
  try {
    const data = await axios.get('/sections');

    stores.notificationStore.addNotification({
      title: 'Section created',
      type: NotificationType.SUCCESS,
    });

    return data;
  } catch (err) {
    return stores.notificationStore.addNotification({
      title: 'Error creating section',
      type: NotificationType.ERROR,
    });
  }
};
