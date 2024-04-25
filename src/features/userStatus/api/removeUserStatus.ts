import { axios } from '@/lib/axios';
import { UserStatus } from '../types/userStatus';
import { handleApiError } from '@/utils/handleApiError';

export const removeUserStatus = async (userStatusUuid: string): Promise<UserStatus> => {
  try {
    const { data } = await axios.delete(`/user-statuses/${userStatusUuid}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
