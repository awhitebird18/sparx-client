import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { UserStatus } from '../types/userStatus';
import { CreateUserStatus } from '../types/createUserStatus';

export const createUserStatus = async (createUserStatus: CreateUserStatus): Promise<UserStatus> => {
  try {
    const res = await axios.post('/user-statuses', createUserStatus);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching users');
  }
};
