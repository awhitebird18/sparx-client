import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeUserFromChannel = async (channelId: string, userId: string) => {
  try {
    const { data } = await axios.delete(`/channel-subscriptions/remove/${channelId}/${userId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
