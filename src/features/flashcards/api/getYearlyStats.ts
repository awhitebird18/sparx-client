import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { StatDailyStudiedCount } from '../types/statDailyStudiedCount';

export const getYearlyStats = async (): Promise<StatDailyStudiedCount[]> => {
  try {
    const { data } = await axios.get('review-history/yearly-stats');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
