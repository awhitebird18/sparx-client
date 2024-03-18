import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const joinChannel = async ({
  channelId,
  sectionId,
}: {
  channelId: string;
  sectionId?: string;
}) => {
  try {
    const res = await axios.post('channel-subscriptions/join', { channelId, sectionId });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
