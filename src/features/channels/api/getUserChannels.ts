import { axios } from '@/lib/axios';
import { convertToDayJs } from '@/utils/convertToDayjs';
import { handleApiError } from '@/utils/handleApiError';

export const getUserChannels = async (workspaceId: string): Promise<any[]> => {
  try {
    const res = await axios.get(`/channel-subscriptions/workspace/${workspaceId}`);

    return convertToDayJs(res.data);
  } catch (error) {
    return handleApiError(error);
  }
};
