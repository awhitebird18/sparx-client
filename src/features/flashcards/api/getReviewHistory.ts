import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getReviewHistory = async (): Promise<any[]> => {
  try {
    const res = await axios.get('review-history/last-30-days');

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
