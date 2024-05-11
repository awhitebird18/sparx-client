import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeSection = async (sectionId: string): Promise<void> => {
  try {
    const { data } = await axios.delete(`/sections/${sectionId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
