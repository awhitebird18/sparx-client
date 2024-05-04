import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { NodemapSettings } from '../types/nodemapSettings';

export const createNodemapSettings = async (workspaceId: string): Promise<NodemapSettings> => {
  try {
    const { data } = await axios.post(`/nodemap-settings/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
