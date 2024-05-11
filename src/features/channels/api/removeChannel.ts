import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeChannel = async (channelId: string): Promise<void> => {
  try {
    await axios.delete(`/channels/${channelId}`);
  } catch (error) {
    return handleApiError(error);
  }
};
