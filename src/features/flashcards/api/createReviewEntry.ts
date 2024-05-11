import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { CardReview } from '../types/cardReview';

export const createReviewEntry = async (reviewData: CardReview[]): Promise<CardReview> => {
  try {
    const { data } = await axios.post('cards/review', reviewData);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
