import { axios } from '@/lib/axios';
import { Channel } from '../types';
import { handleApiError } from '@/utils/handleApiError';

// Uses the user uuid of the other user
export const getDirectChannel = async (userUuid: string): Promise<Channel> => {
  try {
    const res = await axios.get('/channels/direct', {
      params: {
        userUuid,
      },
    });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
