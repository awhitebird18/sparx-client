import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

import { Template } from '../types/template';

export const updateTemplate = async (
  uuid: string,
  updatedFields: Partial<Template>,
): Promise<Template> => {
  try {
    const res = await axios.patch(`card-template/${uuid}`, updatedFields);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
