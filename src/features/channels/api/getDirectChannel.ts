import { axios } from '@/lib/axios';
import { Channel } from '..';
import { AxiosError } from 'axios';

// Uses the user uuid of the other user
export const getDirectChannel = async (userUuid: string): Promise<Channel> => {
  try {
    const res = await axios.get('/direct-channels', {
      params: {
        userUuid,
      },
    });

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    // re-throw the error to be caught and handled elsewhere
    throw new Error(axiosError.message || 'Error fetching channels');
  }
};
