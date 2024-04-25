import { axios } from '@/lib/axios';
import { CreateSection, Section } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const createSection = async (createSection: CreateSection): Promise<Section> => {
  try {
    const res = await axios.post('/sections', createSection);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
