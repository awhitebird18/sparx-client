import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

import { Field } from '../types/field';

export const updateField = async (uuid: string, updatedFields: Partial<Field>): Promise<Field> => {
  try {
    const { data } = await axios.patch(`card-field/${uuid}`, updatedFields);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
