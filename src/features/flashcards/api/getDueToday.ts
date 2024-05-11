import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { StatCardsDuePerChannelCount } from '../types/statCardsDuePerChannelCount';

export const getDueToday = async ({
  workspaceId,
}: {
  workspaceId: string;
}): Promise<StatCardsDuePerChannelCount[]> => {
  try {
    const { data } = await axios.get(`cards/due-today/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
