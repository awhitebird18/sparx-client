import { axios } from '@/lib/axios';

import { WorkspaceChannel } from '..';
import { AxiosError } from 'axios';

export const getWorkspaceChannels = async (
  page: number,
  pageSize?: number,
): Promise<WorkspaceChannel[]> => {
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
