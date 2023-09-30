import { axios } from '@/lib/axios';
import { Section, SectionIndex } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const updateSectionOrder = async (sectionIndexes: SectionIndex[]): Promise<Section[]> => {
  try {
    const { data } = await axios.patch('/sections/reorder', sectionIndexes);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
