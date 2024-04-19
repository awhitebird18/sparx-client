import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const createTask = async (createTask: any) => {
  try {
    const { data } = await axios.post('/tasks', createTask);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
