import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getTasks = async (workspaceId: string): Promise<any[]> => {
  try {
    const res = await axios.get(`/tasks/user/${workspaceId}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
