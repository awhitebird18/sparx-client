import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const createCardNote = async (
  templateId: string,
  fieldValues: any,
  currentChannelId: string,
) => {
  try {
    const res = await axios.post('card-note', {
      templateId,
      fieldValues,
      channelId: currentChannelId,
    });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
