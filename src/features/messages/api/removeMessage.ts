import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeMessage = async (messageId: string) => {
  try {
    const res = await axios.delete(`/messages/${messageId}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
