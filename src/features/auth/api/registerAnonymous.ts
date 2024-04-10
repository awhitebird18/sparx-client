import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';

export const registerAnonymous = async () => {
  try {
    const { data } = await axios.post('/auth/register-anonymous');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
