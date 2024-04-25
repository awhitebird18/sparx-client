import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Note } from '../types/note';

export const removeNote = async (noteUuid: string): Promise<Note> => {
  try {
    const { data } = await axios.delete(`notes/${noteUuid}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
