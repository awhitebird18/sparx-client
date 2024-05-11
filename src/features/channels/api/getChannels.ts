import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Channel } from '../types';

export const getChannels = async (workspaceId: string): Promise<Channel[]> => {
  try {
    const { data } = await axios.get(`/channels/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
