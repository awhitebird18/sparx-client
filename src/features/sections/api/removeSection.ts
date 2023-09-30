import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { Section } from '../types/section';
import { handleApiError } from '@/utils/handleApiError';

export const removeSection = async (sectionId: string): Promise<Section[]> => {
  try {
    const res = await axios.delete(`/sections/${sectionId}`);

    stores.notificationStore.addNotification({
      title: 'Section deleted',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
