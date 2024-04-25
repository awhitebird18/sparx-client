import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { CreateVariant } from '../types/createVariant';
import { Variant } from '../types/variant';

export const createVariant = async (createVariant: CreateVariant): Promise<Variant> => {
  try {
    const { data } = await axios.post('card-type', createVariant);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
