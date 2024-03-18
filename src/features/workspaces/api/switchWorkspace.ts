import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const switchWorkspace = async (workspaceId: string) => {
  try {
    const { data } = await axios.patch(`/user-workspaces/${workspaceId}/last-viewed`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
