import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Activity } from '../types/activity';

export const getActivities = async (endpoint: string): Promise<Activity[]> => {
  try {
    const { data } = await axios.get(endpoint);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
