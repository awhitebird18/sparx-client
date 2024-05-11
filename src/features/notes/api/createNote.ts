import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Note } from '../types/note';

export const createNote = async (nodeUuid: string): Promise<Note> => {
  try {
    const { data } = await axios.post('notes', { channelId: nodeUuid });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
