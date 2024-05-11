import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

export const removeMessage = async (messageId: string): Promise<string> => {
  try {
    const { data } = await axios.delete(`/messages/${messageId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
