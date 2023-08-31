import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { Channel } from '../types';

export const getSubscribedChannels = async (): Promise<Channel[]> => {
  try {
    const res = await axios.get('/channels');

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching channels');
  }
};
