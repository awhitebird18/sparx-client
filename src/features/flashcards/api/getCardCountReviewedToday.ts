import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getCardCountReviewedToday = async (): Promise<number> => {
  try {
    const { data } = await axios.get('review-history/today');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
