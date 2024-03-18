import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';

export const updateSectionOrder = async (indexes: SectionIndex[]): Promise<Section[]> => {
  try {
    const { data } = await axios.patch('/sections/reorder', indexes);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
