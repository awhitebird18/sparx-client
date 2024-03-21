import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';

export const markUserWorkspaceViewed = async (userWorkspaceId: string) => {
  try {
    const { data } = await axios.patch(`/user-workspaces/${userWorkspaceId}/user`, {
      isFirstLogin: false,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
