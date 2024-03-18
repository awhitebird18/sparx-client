import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';

export const getUserWorkspaces = async () => {
  try {
    const { data } = await axios.get('/user-workspaces');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
