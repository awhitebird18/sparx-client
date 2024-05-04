import { axios } from '@/lib/axios';
import { Channel, ChannelSubscription } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const updateUserChannel = async (
  channelId: string,
  updateFields: Partial<Channel>,
): Promise<ChannelSubscription> => {
  console.log(updateFields);
  try {
    const { data } = await axios.patch(`/channel-subscriptions/${channelId}`, updateFields);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
