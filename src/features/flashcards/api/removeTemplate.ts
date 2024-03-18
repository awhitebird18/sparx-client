import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeTemplate = async (uuid: string) => {
  try {
    const res = await axios.delete(`card-template/${uuid}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
