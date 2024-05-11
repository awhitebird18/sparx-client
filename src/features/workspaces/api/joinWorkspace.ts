import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';
import { WorkspaceDetails } from '../types/workspaceDetails';

export const joinWorkspace = async (id: string): Promise<WorkspaceDetails> => {
  try {
    const { data } = await axios.post(`/user-workspaces/join/${id}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
