import { axios } from '@/lib/axios';
import { UpdateReaction } from '@/features/reactions/types';
import { Message } from '@/features/messages/types';
import { handleApiError } from '@/utils/handleApiError';

export const addReaction = async (updateReaction: UpdateReaction): Promise<Message> => {
  try {
    const res = await axios.patch(`/messages/${updateReaction.messageId}/reaction`, updateReaction);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
