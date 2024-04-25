import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { StatFutureDueCount } from '../types/statFutureDueCount';

export const getFutureDue = async (): Promise<StatFutureDueCount[]> => {
  try {
    const { data } = await axios.get('cards/due-next-30-days');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
