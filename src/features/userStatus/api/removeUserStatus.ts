import { axios } from '@/lib/axios';
import { UserStatus } from '../types/userStatus';
import { handleApiError } from '@/utils/handleApiError';

export const removeUserStatus = async (userStatusUuid: string): Promise<UserStatus> => {
  try {
    const res = await axios.delete(`/user-statuses/${userStatusUuid}`);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
