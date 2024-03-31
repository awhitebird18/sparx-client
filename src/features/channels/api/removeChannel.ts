import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeChannel = async (channelId: string, workspaceId: string) => {
  try {
    const { data } = await axios.delete(`/channels/${channelId}/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
