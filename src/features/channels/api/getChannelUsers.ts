import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getChannelUsers = async (channelId: string): Promise<string[]> => {
  try {
    const res = await axios.get(`/channels/${channelId}/users`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
