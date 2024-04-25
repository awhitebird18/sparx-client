import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeVariant = async (uuid: string): Promise<void> => {
  try {
    await axios.delete(`card-type/${uuid}`);
  } catch (error) {
    return handleApiError(error);
  }
};
