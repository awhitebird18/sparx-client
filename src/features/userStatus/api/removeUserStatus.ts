import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { UserStatus } from '../types/userStatus';

export const removeUserStatus = async (userStatusUuid: string): Promise<UserStatus> => {
  try {
    const res = await axios.delete('/user-statuses', { params: userStatusUuid });

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching users');
  }
};
