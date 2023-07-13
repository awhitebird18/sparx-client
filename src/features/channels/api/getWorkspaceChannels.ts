import { axios } from '@/lib/axios';

import { Channel } from '..';
import { AxiosError } from 'axios';

export const getWorkspaceChannels = async (): Promise<Channel[]> => {
  try {
    const res = await axios.get('/channels');

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching channels');
  }
};
