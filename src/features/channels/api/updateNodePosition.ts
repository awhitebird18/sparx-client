import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Channel } from '../types';

export const updateNodePosition = async (
  channelId: string,
  position: { x: number; y: number },
): Promise<Channel> => {
  try {
    const { data } = await axios.patch(`/channels/${channelId}/position`, position);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
