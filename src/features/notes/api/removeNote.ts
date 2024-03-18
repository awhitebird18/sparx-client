import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeNote = async (noteUuid: string) => {
  try {
    const res = await axios.delete(`notes/${noteUuid}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
