import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { NoteTopic } from '../types/noteTopic';

export const generateSubtopics = async (
  channelId: string,
  workspaceId: string,
): Promise<NoteTopic[]> => {
  try {
    const { data } = await axios.get(
      `/assistant/generate-subtopics?channelId=${channelId}&workspaceId=${workspaceId}`,
    );

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
