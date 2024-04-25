import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';
import { WorkspaceDetails } from '../types/workspaceDetails';

export const getUserWorkspaces = async (): Promise<WorkspaceDetails[]> => {
  try {
    const { data } = await axios.get('/user-workspaces');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
