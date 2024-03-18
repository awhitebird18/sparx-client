import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getExperience = async (userId: string, workspaceId: string): Promise<any> => {
  try {
    const res = await axios.get(`/experience/${userId}/${workspaceId}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
