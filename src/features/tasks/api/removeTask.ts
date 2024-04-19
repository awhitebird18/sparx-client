import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeTask = async (taskId: string, workspaceId: string) => {
  try {
    const { data } = await axios.delete(`/tasks/${taskId}/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
