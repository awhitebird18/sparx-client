import { ChannelSubscription } from '@/features/channels/types';
import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const updateChannelSection = async (
  channelId: string,
  sectionId: string | undefined,
): Promise<ChannelSubscription> => {
  try {
    const { data } = await axios.patch(`/channel-subscriptions/move/${channelId}`, { sectionId });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
