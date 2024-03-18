import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeField = async (uuid: string) => {
  try {
    const res = await axios.delete(`card-field/${uuid}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
