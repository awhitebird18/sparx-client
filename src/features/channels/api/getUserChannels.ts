import { axios } from '@/lib/axios';

import { Channel } from '..';
import { AxiosError } from 'axios';

export const getUserChannels = async (): Promise<Channel[]> => {
  try {
    const res = await axios.get('/channels/user-channels');

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    // re-throw the error to be caught and handled elsewhere
    throw new Error(axiosError.message || 'Error fetching channels');
  }
};
