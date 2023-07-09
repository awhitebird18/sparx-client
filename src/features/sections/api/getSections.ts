import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/stores';
import { Section } from '..';

export const getSections = async (): Promise<Section[]> => {
  try {
    const res = await axios.get('/sections');

    stores.notificationStore.addNotification({
      title: 'Section created',
      type: NotificationType.SUCCESS,
    });

    return res.data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error creating section',
      type: NotificationType.ERROR,
    });

    return [];
  }
};
