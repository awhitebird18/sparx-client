import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeTask = async (taskId: string, workspaceId: string): Promise<void> => {
  try {
    await axios.delete(`/tasks/${taskId}/${workspaceId}`);
  } catch (error) {
    return handleApiError(error);
  }
};
