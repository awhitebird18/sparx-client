import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getRecentWorkspaceActivity = async (workspaceId: string) => {
  try {
    const { data } = await axios.get(`/activity/workspace/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
