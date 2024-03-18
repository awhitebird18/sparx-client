import { axios } from '@/lib/axios';
import { CreateChannel } from '../types/createChannel';
import { handleApiError } from '@/utils/handleApiError';

export const createChannel = async (
  createChannel: CreateChannel,
  sectionId: string | undefined,
  workspaceId: string,
) => {
  try {
    const { data } = await axios.post('/channel-management', {
      createChannel,
      sectionId,
      workspaceId,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
