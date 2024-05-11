import { axios } from '@/lib/axios';

import { CreateWorkspace } from '../types';
import { handleApiError } from '@/utils/handleApiError';
import { Workspace } from '../types/workspace';

export const createWorkspace = async (workspace: CreateWorkspace): Promise<Workspace> => {
  try {
    const { data } = await axios.post('/workspaces', workspace);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
