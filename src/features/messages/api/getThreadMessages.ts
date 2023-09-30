import { axios } from '@/lib/axios';

import { Message } from '@/features/messages/types';
import { handleApiError } from '@/utils/handleApiError';

export const getThreadMessages = async (messageId: string): Promise<Message[]> => {
  try {
    const res = await axios.get(`/messages/thread/${messageId}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
