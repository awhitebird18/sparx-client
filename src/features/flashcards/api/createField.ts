import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Field } from '../types/field';
import { CreateField } from '../types/createField';

export const createField = async (createField: CreateField): Promise<Field> => {
  try {
    const res = await axios.post('card-field', createField);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
