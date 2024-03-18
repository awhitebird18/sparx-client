import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { SubscriptionDetails } from '../types/subsciptionDetails';

export const getChannelUsers = async (channelId: string): Promise<SubscriptionDetails[]> => {
  try {
    const res = await axios.get(`/channels/${channelId}/channel-users`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
