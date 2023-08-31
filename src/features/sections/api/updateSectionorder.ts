import { axios } from '@/lib/axios';

import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { Section, SectionIndex } from '../types';

export const updateSectionOrder = async (sectionIndexes: SectionIndex[]): Promise<Section[]> => {
  try {
    const { data } = await axios.patch('/sections/reorder', sectionIndexes);

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error updating section',
      type: NotificationType.ERROR,
      show: true,
    });

    throw err;
  }
};
