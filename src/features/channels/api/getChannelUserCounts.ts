import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getChannelUserCounts = async (workspaceId: string): Promise<any[]> => {
  try {
    const res = await axios.get(`/channels/user-count/${workspaceId}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
