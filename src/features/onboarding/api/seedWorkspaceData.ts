import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const seedWorkspaceData = async (workspaceId: string): Promise<any> => {
  try {
    const { data } = await axios.post(`/auth/seed-workspace-data/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
