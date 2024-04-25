import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { ChannelSubscription } from '@/features/channels/types';

export const getChannelUsers = async (channelId: string): Promise<ChannelSubscription[]> => {
  try {
    const res = await axios.get(`/channels/${channelId}/channel-users`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
