import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { UpdateWorkspace } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const updateWorkspace = async (workspaceId: string, updateWorkspace: UpdateWorkspace) => {
  try {
    const { data } = await axios.patch(`/workspaces/${workspaceId}`, updateWorkspace);

    stores.notificationStore.addNotification({
      title: 'Workspace updated',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
