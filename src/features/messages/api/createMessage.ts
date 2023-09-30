import { axios } from '@/lib/axios';
import { CreateMesssage, Message } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const createMessage = async (message: CreateMesssage): Promise<Message> => {
  try {
    const res = await axios.post('/messages', message);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
