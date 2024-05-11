import { axios } from '@/lib/axios';
import { CreateSection, Section } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const createSection = async (createSection: CreateSection): Promise<Section> => {
  try {
    const { data } = await axios.post('/sections', createSection);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
