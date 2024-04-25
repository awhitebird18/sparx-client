import { axios } from '@/lib/axios';

import { CreateWorkspace } from '../types';
import { handleApiError } from '@/utils/handleApiError';
import { Workspace } from '../types/workspace';

export const createWorkspace = async (createWorkspace: CreateWorkspace): Promise<Workspace> => {
  try {
    const { data } = await axios.post('/workspaces', createWorkspace);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
