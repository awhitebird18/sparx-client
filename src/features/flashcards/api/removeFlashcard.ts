import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeFlashcard = async (uuid: string): Promise<void> => {
  try {
    await axios.delete(`flashcards/${uuid}`);
  } catch (error) {
    return handleApiError(error);
  }
};
