import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { Channel } from '../types';

// Uses the user uuid of the other user
export const getDirectChannel = async (userUuid: string): Promise<Channel> => {
  try {
    const res = await axios.get('/channels/direct', {
      params: {
        userUuid,
      },
    });

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching channels');
  }
};
