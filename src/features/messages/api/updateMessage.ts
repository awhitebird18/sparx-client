import { axios } from '@/lib/axios';
import { Message, UpdateMessage } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const updateMessage = async (id: string, updateMessage: UpdateMessage): Promise<Message> => {
  try {
    const { data } = await axios.patch(`/messages/${id}`, updateMessage);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
