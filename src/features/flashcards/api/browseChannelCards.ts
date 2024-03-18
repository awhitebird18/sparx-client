import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const browseChannelCards = async (channelId: string) => {
  try {
    const res = await axios.get(`cards/channel/${channelId}/browse`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
