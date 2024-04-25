import { axios } from '@/lib/axios';
import { UserStatus } from '../types/userStatus';
import { CreateUserStatus } from '../types/createUserStatus';
import { handleApiError } from '@/utils/handleApiError';

export const createUserStatus = async (createUserStatus: CreateUserStatus): Promise<UserStatus> => {
  try {
    const { data } = await axios.post('/user-statuses', createUserStatus);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
