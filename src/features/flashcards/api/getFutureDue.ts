import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getFutureDue = async (): Promise<any[]> => {
  try {
    const res = await axios.get('cards/due-next-30-days');

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
