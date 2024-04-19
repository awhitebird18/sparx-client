import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getUserActivity = async (userId: string, workspaceId: string) => {
  try {
    const { data } = await axios.get(`/activity/user?userId=${userId}&workspaceId=${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
