import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Variant } from '../types/variant';

export const removeVariantField = async (
  variantId: string,
  newField: { fieldId: string; cardSide: 'front' | 'back' },
): Promise<Variant> => {
  try {
    const { data } = await axios.post(`card-type/${variantId}/fields/remove`, newField);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
