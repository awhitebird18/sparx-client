import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Flashcard } from '../types/card';

export const updateFlashcard = async ({
  uuid,
  updatedFields,
}: {
  uuid: string;
  updatedFields: Partial<Flashcard>;
}): Promise<Flashcard> => {
  try {
    const res = await axios.patch(`flashcards/${uuid}`, updatedFields);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
