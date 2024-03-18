import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getYearlyStats = async (): Promise<any[]> => {
  try {
    const res = await axios.get('review-history/yearly-stats');

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
