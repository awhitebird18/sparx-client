import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Line } from '@/features/workspaceChannels/types/line';

// Uses the user uuid of the other user
export const getChannelConnectors = async (workspaceId: string): Promise<Line[]> => {
  try {
    const res = await axios.get(`/channel-connectors/workspace/${workspaceId}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
