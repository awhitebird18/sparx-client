import { axios } from '@/lib/axios';
import { Channel } from '../types/channel';
import { handleApiError } from '@/utils/handleApiError';

export const updateChannel = async (
  channelId: string,
  updateFields: Partial<Channel>,
  workspaceId: string,
): Promise<Channel> => {
  try {
    const { data } = await axios.patch(`/channels/${channelId}`, {
      updateChannelDto: updateFields,
      workspaceId,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
