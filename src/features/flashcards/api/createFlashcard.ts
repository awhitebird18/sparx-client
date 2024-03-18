import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const createFlashcard = async () => {
  try {
    const res = await axios.post('flashcards');

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
