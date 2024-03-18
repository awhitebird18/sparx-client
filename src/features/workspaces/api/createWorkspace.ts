import { axios } from '@/lib/axios';

import { CreateWorkspace } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const createWorkspace = async (createWorkspace: CreateWorkspace) => {
  try {
    const { data } = await axios.post('/workspaces', createWorkspace);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
