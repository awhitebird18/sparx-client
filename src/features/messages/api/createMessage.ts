import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { CreateMesssage, Message } from '../types';

export const createMessage = async (message: CreateMesssage): Promise<Message> => {
  try {
    const res = await axios.post('/messages', message);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching messages');
  }
};
