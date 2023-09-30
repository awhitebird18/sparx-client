import { axios } from '@/lib/axios';
import { Thread } from '../types/thread';
import { handleApiError } from '@/utils/handleApiError';

export const getUserThreads = async (): Promise<Thread[]> => {
  try {
    const res = await axios.get(`/messages/user-threads`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
