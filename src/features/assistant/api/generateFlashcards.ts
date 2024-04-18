import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const generateFlashcards = async (noteId: string) => {
  try {
    const { data } = await axios.post(`/assistant/generate-flashcards?noteId=${noteId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
