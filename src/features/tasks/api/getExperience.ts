import { Experience } from '@/features/profile/types/experience';
import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getExperience = async (userId: string, workspaceId: string): Promise<Experience[]> => {
  try {
    const { data } = await axios.get(`/experience/${userId}/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
