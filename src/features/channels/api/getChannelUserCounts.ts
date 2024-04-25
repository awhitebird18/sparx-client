import { ChannelUserCount } from '@/features/channels/types/channelUserCount';
import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getChannelUserCounts = async (workspaceId: string): Promise<ChannelUserCount[]> => {
  try {
    const { data } = await axios.get(`/channels/user-count/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
