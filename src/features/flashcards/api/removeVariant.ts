import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeVariant = async (uuid: string) => {
  try {
    const res = await axios.delete(`card-type/${uuid}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
