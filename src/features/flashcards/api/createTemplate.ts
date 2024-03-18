import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const createTemplate = async (title: string) => {
  try {
    const res = await axios.post('card-template', { title });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
