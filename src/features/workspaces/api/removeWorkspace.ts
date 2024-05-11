import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';
import { WorkspaceDetails } from '../types/workspaceDetails';

export const leaveWorkspace = async (
  userId: string,
  workspaceId: string,
): Promise<WorkspaceDetails> => {
  try {
    const { data } = await axios.delete(`/user-workspaces/${userId}/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
