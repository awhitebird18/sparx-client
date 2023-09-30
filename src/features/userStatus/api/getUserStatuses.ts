import { axios } from '@/lib/axios';
import { UserStatus } from '../types/userStatus';
import { handleApiError } from '@/utils/handleApiError';

export const getUserStatuses = async (): Promise<UserStatus[]> => {
  try {
    const res = await axios.get('/user-statuses');

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
