import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeVariantField = async (
  variantId: string,
  data: { fieldId: string; cardSide: 'front' | 'back' },
) => {
  try {
    const res = await axios.post(`card-type/${variantId}/fields/remove`, data);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
