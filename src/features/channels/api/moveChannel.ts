import { axios } from '@/lib/axios';
import { Channel } from '../types/channel';
import { handleApiError } from '@/utils/handleApiError';

export const moveChannel = async (
  channelId: string,
  updateFields: Partial<Channel>,
  parentChannelId: string,
): Promise<Channel[]> => {
  try {
    const { data } = await axios.patch(`/channels/move/${channelId}`, {
      updateChannelDto: updateFields,
      parentChannelId,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
