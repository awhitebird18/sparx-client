import { axios } from '@/lib/axios';

import { Channel } from '..';
import { AxiosError } from 'axios';

export const getSubscribedChannels = async (): Promise<Channel[]> => {
  try {
    const res = await axios.get('/userchannels');

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    // re-throw the error to be caught and handled elsewhere
    throw new Error(axiosError.message || 'Error fetching channels');
  }
};
