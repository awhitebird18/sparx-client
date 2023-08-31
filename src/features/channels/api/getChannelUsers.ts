import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

export const getChannelUsers = async (channelId: string): Promise<string[]> => {
  try {
    const res = await axios.get(`/channels/${channelId}/users`);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;
    throw new Error(axiosError.message || 'Error fetching channels');
  }
};
