import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const logout = async (): Promise<{ message: string }> => {
  try {
    const { data } = await axios.post('/auth/logout');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
