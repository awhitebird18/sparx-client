import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeField = async (uuid: string): Promise<void> => {
  try {
    await axios.delete(`card-field/${uuid}`);
  } catch (error) {
    return handleApiError(error);
  }
};
