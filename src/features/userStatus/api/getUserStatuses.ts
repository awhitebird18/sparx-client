import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { UserStatus } from '../types/userStatus';

export const getUserStatuses = async (): Promise<UserStatus[]> => {
  try {
    const res = await axios.get('/user-statuses');

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching users');
  }
};
