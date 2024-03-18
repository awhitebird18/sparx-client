import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getCardCountDueForChannel = async (channelId: string) => {
  try {
    const res = await axios.get(`cards/channel/${channelId}/count`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
