import { axios } from '@/lib/axios';
import { Channel } from '@/features/channels/types';
import { ChannelUserCount } from '@/features/workspaceChannels/types/channelUserCount';
import { convertToDayJs } from '@/utils/convertToDayjs';
import { handleApiError } from '@/utils/handleApiError';

export const getWorkspaceChannels = async (
  page: number,
  pageSize?: number,
): Promise<{ channels: Channel[]; channelUserCounts: ChannelUserCount[] }> => {
  try {
    const res = await axios.get('/channels', {
      params: {
        page,
        pageSize,
      },
    });

    return {
      channels: convertToDayJs(res.data.channels),
      channelUserCounts: res.data.channelUserCounts,
    };
  } catch (error) {
    return handleApiError(error);
  }
};
