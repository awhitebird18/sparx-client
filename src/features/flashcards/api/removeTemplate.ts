import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeTemplate = async (uuid: string): Promise<void> => {
  try {
    await axios.delete(`card-template/${uuid}`);
  } catch (error) {
    return handleApiError(error);
  }
};
