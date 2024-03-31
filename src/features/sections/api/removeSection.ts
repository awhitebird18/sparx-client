import { axios } from '@/lib/axios';
import { Section } from '../types/section';
import { handleApiError } from '@/utils/handleApiError';

export const removeSection = async (sectionId: string): Promise<Section[]> => {
  try {
    const res = await axios.delete(`/sections/${sectionId}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
