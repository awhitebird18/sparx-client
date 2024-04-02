import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const healthCheck = async () => {
  try {
    const { data } = await axios.get('/health-check');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
