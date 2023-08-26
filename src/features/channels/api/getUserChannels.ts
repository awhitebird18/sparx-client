import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { Channel } from '../types';
import { convertToDayJs } from '@/utils/convertToDayjs';

export const getUserChannels = async (): Promise<Channel[]> => {
  try {
    const res = await axios.get('/channels/user-channels');

    return convertToDayJs(res.data);
  } catch (err: unknown) {
    const axiosError = err as AxiosError;
    throw new Error(axiosError.message || 'Error fetching channels');
  }
};
