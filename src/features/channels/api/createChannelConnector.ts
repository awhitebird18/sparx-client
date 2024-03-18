import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { handleApiError } from '@/utils/handleApiError';
import { CreateChannelConnector } from '../types/createChannelConnector';

export const createChannelConnector = async (
  createChannelConnector: CreateChannelConnector,
  workspaceId: string,
) => {
  try {
    const { data } = await axios.post(`/channel-connectors/${workspaceId}`, createChannelConnector);

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
