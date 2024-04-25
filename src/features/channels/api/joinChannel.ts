import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { ChannelSubscription } from '../types';

export const joinChannel = async ({
  channelId,
  sectionId,
}: {
  channelId: string;
  sectionId?: string;
}): Promise<ChannelSubscription> => {
  try {
    const { data } = await axios.post('channel-subscriptions/join', { channelId, sectionId });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
