import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const toggleComplete = async (taskId: string, workspaceId: string) => {
  try {
    const { data } = await axios.patch(`/tasks/toggle-complete/${taskId}/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
