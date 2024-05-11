import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Task } from '../types/task';

export const getTasks = async (workspaceId: string): Promise<Task[]> => {
  try {
    const { data } = await axios.get(`/tasks/user/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
