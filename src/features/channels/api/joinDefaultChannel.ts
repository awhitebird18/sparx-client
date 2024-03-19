import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const joinDefaultChannel = async ({ workspaceId }: { workspaceId: string }) => {
  try {
    const res = await axios.post(`channel-subscriptions/join/defaults?workspaceId=${workspaceId}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
