import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const summarizeArticle = async (article: string, channelId: string, workspaceId: string) => {
  try {
    const { data } = await axios.post(
      `/assistant/summarize-article?channelId=${channelId}&workspaceId=${workspaceId}`,
      { article },
    );

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
