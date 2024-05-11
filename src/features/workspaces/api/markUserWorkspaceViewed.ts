import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';
import { WorkspaceDetails } from '../types/workspaceDetails';

export const markUserWorkspaceViewed = async (
  userWorkspaceId: string,
): Promise<WorkspaceDetails> => {
  try {
    const { data } = await axios.patch(`/user-workspaces/${userWorkspaceId}/user`, {
      isFirstLogin: false,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
