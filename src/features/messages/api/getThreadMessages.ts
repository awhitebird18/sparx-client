import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { Message } from '@/features/messages/types';

export const getThreadMessages = async (messageId: string): Promise<Message[]> => {
  try {
    const res = await axios.get(`/messages/thread/${messageId}`);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching messages');
  }
};
