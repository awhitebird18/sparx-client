import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Note } from '../types/note';

export const getNote = async (uuid: string): Promise<Note> => {
  try {
    const res = await axios.get(`notes/${uuid}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
