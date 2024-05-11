import { Activity } from '@/features/activity/types/activity';
import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getUserActivity = async (userId: string, workspaceId: string): Promise<Activity[]> => {
  try {
    const { data } = await axios.get(`/activity/user?userId=${userId}&workspaceId=${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
