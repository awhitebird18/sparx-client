import { axios } from '@/lib/axios';
import { UserStatus } from '../types/userStatus';
import { handleApiError } from '@/utils/handleApiError';

export const getUserStatuses = async (): Promise<UserStatus[]> => {
  try {
    const { data } = await axios.get('/user-statuses');

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
