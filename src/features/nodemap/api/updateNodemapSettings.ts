import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { NodemapSettings } from '../types/nodemapSettings';

export const updateNodemapSettings = async (
  workspaceId: string,
  udpateFields: Partial<NodemapSettings>,
): Promise<NodemapSettings> => {
  try {
    const { data } = await axios.patch(
      `/nodemap-settings?workspaceId=${workspaceId}`,
      udpateFields,
    );

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
