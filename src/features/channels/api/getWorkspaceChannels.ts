import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { Channel } from '@/features/channels/types';

export const getWorkspaceChannels = async (
  page: number,
  pageSize?: number,
): Promise<{ channel: Channel; userCount: number }[]> => {
  try {
    const res = await axios.get('/channels', {
      params: {
        page,
        pageSize,
      },
    });

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching channels');
  }
};
