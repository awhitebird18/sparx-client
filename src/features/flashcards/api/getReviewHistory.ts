import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { StatReviewHistoryCount } from '../types/statReviewHistoryCount';

export const getReviewHistory = async (): Promise<StatReviewHistoryCount[]> => {
  try {
    const { data } = await axios.get('review-history/last-30-days');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
