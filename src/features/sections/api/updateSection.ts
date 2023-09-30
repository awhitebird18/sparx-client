import { axios } from '@/lib/axios';
import { UpdateSection } from '../types/updateSection';
import { handleApiError } from '@/utils/handleApiError';

export const updateSection = async (sectionId: string, updateSection: UpdateSection) => {
  try {
    const { data } = await axios.patch(`/sections/${sectionId}`, updateSection);

    return data;
  } catch (error) {
    handleApiError(error);
  }
};
