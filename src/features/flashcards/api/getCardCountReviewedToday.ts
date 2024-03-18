import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getCardCountReviewedToday = async () => {
  try {
    const res = await axios.get('review-history/today');

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
