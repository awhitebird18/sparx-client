import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { StatCardsDuePerChannelCount } from '../types/statCardsDuePerChannelCount';

export const getCardCountDueForChannel = async (
  channelId: string,
): Promise<StatCardsDuePerChannelCount> => {
  try {
    const { data } = await axios.get(`cards/channel/${channelId}/count`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
