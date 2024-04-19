import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getRecentWorkspaceActivity = async (workspaceId: string, page: number) => {
  try {
    const { data } = await axios.get(`/activity/workspace/${workspaceId}?page${page}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
