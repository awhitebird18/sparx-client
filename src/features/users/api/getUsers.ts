import { axios } from '@/lib/axios';
import { User } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await axios.get('/users');

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
