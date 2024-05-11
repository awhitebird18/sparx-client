import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';

export const removeTemporaryWorkspace = async (): Promise<{ message: string }> => {
  try {
    const { data } = await axios.delete('/auth/remove-temporary-workspace');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
