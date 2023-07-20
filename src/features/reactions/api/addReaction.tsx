import { axios } from '@/lib/axios';

import { AxiosError } from 'axios';
import { UpdateReaction } from '@/features/reactions';
import { Message } from '@/features/messages';

export const addMessageReactionApi = async (updateReaction: UpdateReaction): Promise<Message> => {
  try {
    const res = await axios.patch(`/messages/${updateReaction.messageId}/reaction`, updateReaction);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    // re-throw the error to be caught and handled elsewhere
    throw new Error(axiosError.message || 'Error fetching messages');
  }
};
