import { axios } from '@/lib/axios';

import { AxiosError } from 'axios';
import { CreateMesssage, Message } from '..';

export const createMessageApi = async (message: CreateMesssage): Promise<Message> => {
  try {
    const res = await axios.post('/messages', message);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    // re-throw the error to be caught and handled elsewhere
    throw new Error(axiosError.message || 'Error fetching messages');
  }
};
