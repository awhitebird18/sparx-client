import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const updateLastRead = async (channelId: string) => {
  try {
    const { data } = await axios.patch(`/channel-subscriptions/last-read/${channelId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
