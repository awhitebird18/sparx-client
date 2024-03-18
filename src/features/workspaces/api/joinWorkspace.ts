import { axios } from '@/lib/axios';

import { handleApiError } from '@/utils/handleApiError';

export const joinWorkspace = async (id: string) => {
  try {
    const { data } = await axios.post(`/user-workspaces/join/${id}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
