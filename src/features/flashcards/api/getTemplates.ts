import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Template } from '../types/template';

export const getTemplates = async (): Promise<Template[]> => {
  try {
    const res = await axios.get('card-template');

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
