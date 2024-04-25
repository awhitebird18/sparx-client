import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Task } from '../types/task';

export const updateTask = async (
  taskId: string,
  workspaceId: string,
  updateFields: Partial<Task>,
): Promise<Task> => {
  try {
    const { data } = await axios.patch(`/tasks/${taskId}`, {
      updateChannelDto: updateFields,
      workspaceId,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
