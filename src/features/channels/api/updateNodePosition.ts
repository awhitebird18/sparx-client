import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const updateNodePosition = async (channelId: string, position: { x: number; y: number }) => {
  try {
    const { data } = await axios.patch(`/channels/${channelId}/position`, position);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
