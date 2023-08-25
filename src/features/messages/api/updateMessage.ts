import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { Message, UpdateMessage } from '../types';

export const updateMessage = async (id: string, updateMessage: UpdateMessage): Promise<Message> => {
  try {
    const res = await axios.patch(`/messages/${id}`, updateMessage);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching messages');
  }
};
