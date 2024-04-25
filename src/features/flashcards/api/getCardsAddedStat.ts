import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { StatCardsAddedCount } from '../types/statCardsAddedCount';

export const getCardsAddedStats = async (): Promise<StatCardsAddedCount[]> => {
  try {
    const { data } = await axios.get('cards/added-last-30-days');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
