import { axios } from '@/lib/axios';

import { AxiosError } from 'axios';
import { Message } from '..';

export const getMessages = async (page: number, channelId: string): Promise<Message[]> => {
  try {
    const res = await axios.get(`/messages/channel/${channelId}?page=${page}`);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    // re-throw the error to be caught and handled elsewhere
    throw new Error(axiosError.message || 'Error fetching messages');
  }
};
