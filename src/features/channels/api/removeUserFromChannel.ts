import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeUserFromChannel = async (channelId: string, userId: string): Promise<void> => {
  try {
    const { data } = await axios.delete(`/channel-subscriptions/remove/${channelId}/${userId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
