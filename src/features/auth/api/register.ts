import { axios } from '@/lib/axios';
import { RegistrationData } from '../types';
import { handleApiError } from '@/utils/handleApiError';
import { User } from '@/features/users/types';

export const register = async (registrationData: RegistrationData): Promise<User> => {
  try {
    const { data } = await axios.post('/auth/register', registrationData);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
