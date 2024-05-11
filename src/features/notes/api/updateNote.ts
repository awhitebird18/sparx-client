import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Note } from '../types/note';

export const updateNote = async (uuid: string, updatedFields: Partial<Note>): Promise<Note> => {
  try {
    const res = await axios.patch(`notes/${uuid}`, updatedFields);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
