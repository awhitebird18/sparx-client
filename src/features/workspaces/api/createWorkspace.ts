import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { CreateWorkspace } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const createWorkspace = async (createWorkspace: CreateWorkspace) => {
  try {
    const { data } = await axios.post('/workspaces', createWorkspace);

    stores.notificationStore.addNotification({
      title: 'Workspace created',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
