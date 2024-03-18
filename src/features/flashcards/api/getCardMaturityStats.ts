import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getCardMaturityStats = async (): Promise<any[]> => {
  try {
    const res = await axios.get('cards/maturity-stats');

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
