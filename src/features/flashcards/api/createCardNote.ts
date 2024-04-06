import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const createCardNote = async (
  templateId: string,
  fieldValues: any,
  currentChannelId: string,
  workspaceId: string,
) => {
  try {
    const res = await axios.post('card-note', {
      templateId,
      fieldValues,
      channelId: currentChannelId,
      workspaceId,
    });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
