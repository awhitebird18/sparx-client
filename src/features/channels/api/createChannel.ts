import { axios } from '@/lib/axios';
import { CreateChannel } from '../types/createChannel';
import { handleApiError } from '@/utils/handleApiError';
import { Channel } from '../types';

export const createChannel = async (
  createChannel: CreateChannel,
  sectionId: string | undefined,
  workspaceId: string,
): Promise<Channel> => {
  try {
    const { data } = await axios.post('/channels', {
      createChannel,
      sectionId,
      workspaceId,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
