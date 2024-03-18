import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';

export const leaveWorkspace = async (userId: string, workspaceId: string) => {
  try {
    const { data } = await axios.delete(`/user-workspaces/${userId}/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
