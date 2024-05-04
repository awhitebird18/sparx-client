import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { ChannelSubscription } from '../types';

export const getUserChannelData = async (workspaceId: string): Promise<ChannelSubscription[]> => {
  try {
    const { data } = await axios.get(`/channel-subscriptions/workspace/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
