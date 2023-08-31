import { axios } from '@/lib/axios';

import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';

import { UpdateSection } from '../types/updateSection';

export const updateSection = async (sectionId: string, updateSection: UpdateSection) => {
  try {
    const { data } = await axios.patch(`/sections/${sectionId}`, updateSection);

    return data;
  } catch (err) {
    return stores.notificationStore.addNotification({
      title: 'Error updating section',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
