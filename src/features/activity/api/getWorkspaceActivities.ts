import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Activity } from '../types/activity';

export const getWorkspaceActivities = async (url: string): Promise<Activity[]> => {
  try {
    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
