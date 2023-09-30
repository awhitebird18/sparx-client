import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { handleApiError } from '@/utils/handleApiError';

export const joinChannel = async ({
  channelId,
  sectionId,
}: {
  channelId: string;
  sectionId: string;
}) => {
  try {
    const { data } = await axios.post('/channel-management/join', { channelId, sectionId });

    stores.notificationStore.addNotification({
      title: 'Channel joined',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
