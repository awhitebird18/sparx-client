import { axios } from '@/lib/axios';
import { UpdateWorkspace } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const updateWorkspace = async (workspaceId: string, updateWorkspace: UpdateWorkspace) => {
  try {
    const { data } = await axios.patch(`/workspaces/${workspaceId}`, updateWorkspace);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
