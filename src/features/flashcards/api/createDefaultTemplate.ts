import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Template } from '../types/template';

export const createDefaultTemplate = async (): Promise<Template> => {
  try {
    const { data } = await axios.post('users/default-template');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
