import { axios } from '@/lib/axios';
import { UpdateSection } from '../types/updateSection';
import { handleApiError } from '@/utils/handleApiError';
import { Section } from '../types';

export const updateSection = async (
  sectionId: string,
  updateSection: UpdateSection,
): Promise<Section> => {
  try {
    const { data } = await axios.patch(`/sections/${sectionId}`, updateSection);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
