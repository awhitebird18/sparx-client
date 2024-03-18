import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const submitReviewData = async (reviewData: any) => {
  try {
    const res = await axios.post('cards/review', reviewData);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
