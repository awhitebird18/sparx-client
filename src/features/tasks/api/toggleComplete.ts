import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Task } from '../types/task';

export const toggleComplete = async (taskId: string, workspaceId: string): Promise<Task> => {
  try {
    const { data } = await axios.patch(`/tasks/toggle-complete/${taskId}/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
