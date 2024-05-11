import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Variant } from '../types/variant';

export const createVariantField = async (
  variantId: string,
  newField: { fieldId: string; cardSide: 'front' | 'back' },
): Promise<Variant> => {
  try {
    const { data } = await axios.post(`card-variant/${variantId}/fields/add`, newField);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
