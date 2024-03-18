import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { CreateVariant } from '../types/CreateVariant';

export const createVariant = async (createVariant: CreateVariant) => {
  try {
    const res = await axios.post('card-type', createVariant);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
