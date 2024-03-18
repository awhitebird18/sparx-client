import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

import { Field } from '../types/Field';

export const updateField = async (uuid: string, updatedFields: Partial<Field>): Promise<Field> => {
  try {
    const res = await axios.patch(`card-field/${uuid}`, updatedFields);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
