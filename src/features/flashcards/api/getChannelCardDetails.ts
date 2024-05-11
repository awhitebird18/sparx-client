import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { CardMetaData } from '../types/cardMetaData';

export const getChannelCardDetails = async (channelId: string): Promise<CardMetaData[]> => {
  try {
    const { data } = await axios.get(`cards/channel/${channelId}/browse`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
