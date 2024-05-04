import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeTemporaryWorkspace = async (workspaceId: string): Promise<void> => {
  try {
    await axios.delete(`/seed/workspace-data/${workspaceId}`);
  } catch (error) {
    return handleApiError(error);
  }
};
