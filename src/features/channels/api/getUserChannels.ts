import { axios } from '@/lib/axios';
import { Channel } from '../types';
import { convertToDayJs } from '@/utils/convertToDayjs';
import { handleApiError } from '@/utils/handleApiError';

export const getUserChannels = async (): Promise<Channel[]> => {
  try {
    const res = await axios.get('/channels/user-channels');

    return convertToDayJs(res.data);
  } catch (error) {
    return handleApiError(error);
  }
};
