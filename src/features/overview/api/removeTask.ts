import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { handleApiError } from '@/utils/handleApiError';

export const removeTask = async (taskId: string, workspaceId: string) => {
  try {
    const { data } = await axios.delete(`/tasks/${taskId}/${workspaceId}`);

    stores.notificationStore.addNotification({
      title: 'Task removed',
      type: NotificationType.SUCCESS,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
