import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';

export const removeChannelConnector = async (uuid: string, workspaceId: string) => {
  try {
    const { data } = await axios.delete(`/channel-connectors/${uuid}/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
