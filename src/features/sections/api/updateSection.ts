import { axios } from '@/lib/axios';
import { UpdateSection } from '..';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';

export const updateSection = async (sectionId: string, updateSection: UpdateSection) => {
  try {
    const { data } = await axios.patch(`/sections/${sectionId}`, updateSection);

    stores.notificationStore.addNotification({
      title: 'Section updated',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    return stores.notificationStore.addNotification({
      title: 'Error updating section',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
