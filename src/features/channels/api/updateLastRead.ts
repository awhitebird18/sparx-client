import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { ChannelSubscription } from '../types';

export const updateLastRead = async (channelId: string): Promise<ChannelSubscription> => {
  try {
    const { data } = await axios.patch(`/channel-subscriptions/last-read/${channelId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
