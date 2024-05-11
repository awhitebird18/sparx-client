import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { WorkspaceDetails } from '../types/workspaceDetails';

export const switchWorkspace = async (workspaceId: string): Promise<WorkspaceDetails> => {
  try {
    const { data } = await axios.patch(`/user-workspaces/${workspaceId}/last-viewed`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
