import { axios } from '@/lib/axios';
import { UpdateUser, User } from '../types';
import { handleApiError } from '@/utils/handleApiError';

export const updateWorkspaceUser = async (
  userUuid: string,
  updateUser: UpdateUser,
): Promise<User> => {
  try {
    const { data } = await axios.patch(`/users/${userUuid}`, updateUser);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
