import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const getDueToday = async ({ workspaceId }: { workspaceId: string }): Promise<any[]> => {
  try {
    const { data } = await axios.get(`cards/due-today/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
