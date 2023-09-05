import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';
import { Thread } from '../types/thread';

export const getUserThreads = async (): Promise<Thread[]> => {
  try {
    const res = await axios.get(`/messages/user-threads`);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching messages');
  }
};
