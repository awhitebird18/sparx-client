import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { CreateChannel } from '../types/createChannel';
import { handleApiError } from '@/utils/handleApiError';

export const createChannel = async (createChannel: CreateChannel, sectionId: string) => {
  try {
    const { data } = await axios.post('/channel-management', { createChannel, sectionId });

    stores.notificationStore.addNotification({
      title: 'Channel created',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
