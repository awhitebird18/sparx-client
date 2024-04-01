import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { CreateChannelConnector } from '../types/createChannelConnector';

export const createChannelConnector = async (
  createChannelConnector: CreateChannelConnector,
  workspaceId: string,
) => {
  try {
    const { data } = await axios.post(`/channel-connectors/${workspaceId}`, createChannelConnector);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
