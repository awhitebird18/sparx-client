import { axios } from '@/lib/axios';
import { LoginData } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const login = async (loginData: LoginData): Promise<{ message: string }> => {
  try {
    const { data } = await axios.post('/auth/login', loginData);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
