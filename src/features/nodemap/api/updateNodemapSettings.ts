import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { NodemapSettings } from '../types/nodemapSettings';

export const updateNodemapSettings = async (
  workspaceId: string,
  udpateFields: Partial<NodemapSettings>,
): Promise<NodemapSettings> => {
  try {
    const res = await axios.patch(`/nodemap-settings/${workspaceId}`, udpateFields);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
