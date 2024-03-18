import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Variant } from '../types/variant';

export const getVariants = async (templateId: string): Promise<Variant[]> => {
  try {
    const res = await axios.get(`card-type/template/${templateId}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
