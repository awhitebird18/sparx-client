import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const createNote = async (nodeUuid: string) => {
  try {
    const res = await axios.post('notes', { channelId: nodeUuid });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
