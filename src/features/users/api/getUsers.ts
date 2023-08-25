import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';

import { User } from '../types';

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await axios.get('/users');

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching users');
  }
};
