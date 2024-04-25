import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Template } from '../types/template';

export const createTemplate = async (title: string): Promise<Template> => {
  try {
    const { data } = await axios.post('card-template', { title });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
