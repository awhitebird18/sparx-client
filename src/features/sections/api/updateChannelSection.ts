import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const updateChannelSection = async (channelId: string, sectionId: string) => {
  try {
    const { data } = await axios.patch(`/channel-subscriptions/move/${channelId}`, { sectionId });

    return data;
  } catch (error) {
    handleApiError(error);
  }
};
