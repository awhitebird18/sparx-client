import { Note } from '@/features/notes/types/note';
import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const generateNote = async (
  title: string,
  channelId: string,
  workspaceId: string,
): Promise<Note> => {
  try {
    const { data } = await axios.post(
      `/notes/generate-note?channelId=${channelId}&workspaceId=${workspaceId}`,
      { title },
    );

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
