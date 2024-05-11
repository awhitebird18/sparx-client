import { axios } from '@/lib/axios';
import { Section } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const getSections = async (): Promise<Section[]> => {
  try {
    const { data } = await axios.get('/sections');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
