import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { CreateTask } from '../types/createTask';
import { Task } from '../types/task';

export const createTask = async (createTask: CreateTask): Promise<Task> => {
  try {
    const { data } = await axios.post('/tasks', createTask);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
