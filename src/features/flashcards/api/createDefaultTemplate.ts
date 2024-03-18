import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const createDefaultTemplate = async () => {
  try {
    const res = await axios.post('users/default-template');

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
