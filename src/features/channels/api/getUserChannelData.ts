import { axios } from '@/lib/axios';
import { convertToDayJs } from '@/utils/convertToDayjs';
import { handleApiError } from '@/utils/handleApiError';
import { ChannelSubscription } from '../types';

export const getUserChannelData = async (workspaceId: string): Promise<ChannelSubscription[]> => {
  try {
    const { data } = await axios.get(`/channel-subscriptions/workspace/${workspaceId}`);

    return convertToDayJs(data);
  } catch (error) {
    return handleApiError(error);
  }
};
