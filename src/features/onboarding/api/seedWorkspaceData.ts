import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const seedWorkspaceData = async (workspaceId: string): Promise<{ message: string }> => {
  try {
    const { data } = await axios.get(`/seed/workspace-data/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
