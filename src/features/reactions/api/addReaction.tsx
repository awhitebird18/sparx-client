import { axios } from '@/lib/axios';
import { CreateReaction } from '@/features/reactions/types';
import { Message } from '@/features/messages/types';
import { handleApiError } from '@/utils/handleApiError';

export const addReaction = async (createReaction: CreateReaction): Promise<Message> => {
  try {
    const { data } = await axios.patch(
      `/messages/${createReaction.messageId}/reaction`,
      createReaction,
    );

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
