import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';
import { CreateSection } from '..';

export const createSectionApi = async (createSection: CreateSection) => {
  try {
    const { data } = await axios.post('/sections', createSection);

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
