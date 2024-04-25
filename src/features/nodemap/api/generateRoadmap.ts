import { Channel } from '@/features/channels/types';
import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const generateRoadmap = async (topic: string, workspaceId: string): Promise<Channel[]> => {
  try {
    const { data } = await axios.post(`/channels/generate-roadmap`, { topic, workspaceId });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
