import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getCardsAddedStats = async (): Promise<any[]> => {
  try {
    const res = await axios.get('cards/added-last-30-days');

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
