import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Workspace } from '../types/workspace';

export const updateWorkspace = async (
  workspaceId: string,
  updateWorkspace: Partial<Workspace>,
): Promise<Workspace> => {
  try {
    const { data } = await axios.patch(`/workspaces/${workspaceId}`, updateWorkspace);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
