import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Flashcard } from '../types/card';

export const getFlashcards = async (channelId: string): Promise<Flashcard[]> => {
  try {
    const { data } = await axios.get(`cards/channel/${channelId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
