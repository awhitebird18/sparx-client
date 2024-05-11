import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { RegisterFormData } from '../types/registerFormData';

export const register = async (registrationData: RegisterFormData): Promise<{ userId: string }> => {
  try {
    const { data } = await axios.post('/auth/register', registrationData);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
