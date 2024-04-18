import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const generateSubtopics = async (channelId: string, workspaceId: string) => {
  try {
    const { data } = await axios.get(
      `/assistant/generate-subtopics?channelId=${channelId}&workspaceId=${workspaceId}`,
    );

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
