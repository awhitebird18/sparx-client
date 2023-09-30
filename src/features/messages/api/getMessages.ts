import { axios } from '@/lib/axios';
import { Message } from '@/features/messages/types';
import { handleApiError } from '@/utils/handleApiError';

export const getMessages = async (page: number, channelId: string): Promise<Message[]> => {
  try {
    const res = await axios.get(`/messages/channel/${channelId}?page=${page}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
