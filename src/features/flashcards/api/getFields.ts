import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Field } from '../types/Field';

export const getFields = async (templateId: string): Promise<Field[]> => {
  try {
    const res = await axios.get(`card-field/template/${templateId}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
