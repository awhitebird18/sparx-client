import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Channel } from '../types';

export const getSubscribedChannels = async (workspaceId: string): Promise<Channel[]> => {
  try {
    const res = await axios.get(`/channels/${workspaceId}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
