import { axios } from '@/lib/axios';
import { User } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await axios.get('/users');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
