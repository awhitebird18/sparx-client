import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeFlashcard = async (uuid: string) => {
  try {
    const res = await axios.delete(`flashcards/${uuid}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
