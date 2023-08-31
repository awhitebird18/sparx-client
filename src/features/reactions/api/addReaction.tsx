import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { UpdateReaction } from '@/features/reactions/types';
import { Message } from '@/features/messages/types';

export const addReaction = async (updateReaction: UpdateReaction): Promise<Message> => {
  try {
    const res = await axios.patch(`/messages/${updateReaction.messageId}/reaction`, updateReaction);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching messages');
  }
};
