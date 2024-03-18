import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';

export const removeChannelConnectors = async (ids: string[]) => {
  try {
    const { data } = await axios.post(`/channel-connectors/bulk-delete`, { ids });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
