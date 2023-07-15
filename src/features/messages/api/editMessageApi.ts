import { axios } from '@/lib/axios';

import { AxiosError } from 'axios';
import { CreateMesssage, Message } from '..';

export const editMessageApi = async (
  id: string,
  updateMessage: CreateMesssage,
): Promise<Message> => {
  try {
    const res = await axios.patch(`/messages/${id}`, updateMessage);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    // re-throw the error to be caught and handled elsewhere
    throw new Error(axiosError.message || 'Error fetching messages');
  }
};
