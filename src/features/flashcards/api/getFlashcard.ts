import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Flashcard } from '../types/card';

export const getFlashcard = async (uuid: string): Promise<Flashcard> => {
  try {
    const { data } = await axios.get(`cards/${uuid}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
