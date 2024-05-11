import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Note } from '../types/note';

export const getChannelNotes = async (nodeUuid: string): Promise<Note[]> => {
  try {
    const res = await axios.get(`notes/channel/${nodeUuid}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
