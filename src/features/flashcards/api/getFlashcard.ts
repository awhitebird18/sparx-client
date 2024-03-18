import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Flashcard } from '../types/card';

export const getFlashcard = async (uuid: string): Promise<Flashcard> => {
  try {
    const res = await axios.get(`cards/${uuid}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
