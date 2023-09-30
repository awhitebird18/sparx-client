import { axios } from '@/lib/axios';
import { UserStatus } from '../types/userStatus';
import { UpdateUserStatus } from '../types/updateUserStatus';
import { handleApiError } from '@/utils/handleApiError';

export const updateUserStatus = async (
  userStatusUuid: string,
  updateUserStatus: UpdateUserStatus,
): Promise<UserStatus> => {
  try {
    const res = await axios.patch(`/user-statuses/${userStatusUuid}`, updateUserStatus);

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
