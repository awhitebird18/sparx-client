import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const addVariantField = async (
  variantId: string,
  data: { fieldId: string; cardSide: 'front' | 'back' },
) => {
  try {
    const res = await axios.post(`card-type/${variantId}/fields/add`, data);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
