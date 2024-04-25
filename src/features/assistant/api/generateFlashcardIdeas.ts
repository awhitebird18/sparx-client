import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { FlashcardIdea } from '../types/flashcardIdea';

export const generateFlashcardIdeas = async (
  noteId: string,
  channelId: string,
): Promise<FlashcardIdea[]> => {
  try {
    const { data } = await axios.post(
      `/cards/generate-flashcard-ideas?noteId=${noteId}?channelId=${channelId}`,
    );

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
