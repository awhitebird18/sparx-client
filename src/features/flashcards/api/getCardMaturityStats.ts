import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { StatCardMaturityCount } from '../types/statCardMaturityCount';

export const getCardMaturityStats = async (): Promise<StatCardMaturityCount[]> => {
  try {
    const { data } = await axios.get('cards/maturity-stats');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
