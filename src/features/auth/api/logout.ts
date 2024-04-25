import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const logout = async () => {
  try {
    const { data } = await axios.post('/auth/logout');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
