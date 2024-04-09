import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const generateRoadmap = async (topic: string, workspaceId: string): Promise<any> => {
  try {
    const res = await axios.post(`/auth/generate-roadmap`, { topic, workspaceId });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
