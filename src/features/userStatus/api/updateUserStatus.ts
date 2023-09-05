import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { UserStatus } from '../types/userStatus';
import { UpdateUserStatus } from '../types/updateUserStatus';

export const updateUserStatus = async (
  userStatusUuid: string,
  updateUserStatus: UpdateUserStatus,
): Promise<UserStatus> => {
  try {
    const res = await axios.patch('/user-statuses', updateUserStatus, { params: userStatusUuid });

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching users');
  }
};
