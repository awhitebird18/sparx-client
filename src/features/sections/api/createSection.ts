import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/stores';
import { CreateSection } from '..';

export const createSection = async (createSection: CreateSection) => {
  try {
    const { data } = await axios.post('/sections', createSection);

    stores.notificationStore.addNotification({
      title: 'Section created',
      type: NotificationType.SUCCESS,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error creating section',
      type: NotificationType.ERROR,
    });
  }
};
