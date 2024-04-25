import { axios } from '@/lib/axios';
import { CreateMesssage, Message } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const createMessage = async (message: CreateMesssage): Promise<Message> => {
  try {
    const { data } = await axios.post('/messages', message);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
