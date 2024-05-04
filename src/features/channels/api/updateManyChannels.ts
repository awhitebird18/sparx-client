import { axios } from '@/lib/axios';
import { Channel } from '../types/channel';
import { handleApiError } from '@/utils/handleApiError';

export const updateChannelPositions = async (
  channels: {
    uuid: string;
    x: number;
    y: number;
  }[],
): Promise<Channel[]> => {
  try {
    const { data } = await axios.patch('/channels/positions', {
      channels,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
