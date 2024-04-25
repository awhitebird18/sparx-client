import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Field } from '../types/field';

export const getFields = async (templateId: string): Promise<Field[]> => {
  try {
    const { data } = await axios.get(`card-field/template/${templateId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
