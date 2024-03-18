import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Variant } from '../types/variant';

export const updateVariant = async (
  uuid: string,
  updatedFields: Partial<Variant>,
): Promise<Variant> => {
  try {
    const res = await axios.patch(`card-type/${uuid}`, updatedFields);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
