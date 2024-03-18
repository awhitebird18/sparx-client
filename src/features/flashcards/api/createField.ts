import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const createField = async (createField: { title: string; templateId: string }) => {
  try {
    const res = await axios.post('card-field', createField);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
