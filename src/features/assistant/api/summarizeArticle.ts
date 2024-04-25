import { Note } from '@/features/notes/types/note';
import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const summarizeArticle = async (article: string, channelId: string): Promise<Note> => {
  try {
    const { data } = await axios.post(`/notes/summarize-article?channelId=${channelId}`, {
      article,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
