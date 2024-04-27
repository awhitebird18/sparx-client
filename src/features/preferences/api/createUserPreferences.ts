import { axios } from '@/lib/axios';
import { UpdateUserPreferences } from '../types/updateUserPreference';
import { UserPreferences } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const createUserPreferences = async (
  updateFields: UpdateUserPreferences,
): Promise<UserPreferences> => {
  try {
    const { data } = await axios.post(`/user-preferences`, updateFields);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
