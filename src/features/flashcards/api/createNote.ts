import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { CreateNote } from '../types/createNote';
import { Flashcard } from '../types/card';

export const createNote = async ({
  templateId,
  fieldValues,
  currentChannelId,
  workspaceId,
}: CreateNote): Promise<Flashcard[]> => {
  try {
    const { data } = await axios.post('card-note', {
      templateId,
      fieldValues,
      channelId: currentChannelId,
      workspaceId,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
