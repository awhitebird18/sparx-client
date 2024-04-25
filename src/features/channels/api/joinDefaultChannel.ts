import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { ChannelSubscription } from '../types';

export const joinDefaultChannel = async ({
  workspaceId,
}: {
  workspaceId: string;
}): Promise<ChannelSubscription> => {
  try {
    const { data } = await axios.post(
      `channel-subscriptions/join/defaults?workspaceId=${workspaceId}`,
    );

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
