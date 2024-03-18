import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Note } from '../types/Note';

export const moveNote = async (uuid: string, nodeId: string): Promise<Note> => {
  try {
    const res = await axios.patch(`notes/${uuid}/move`, { channelId: nodeId });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
