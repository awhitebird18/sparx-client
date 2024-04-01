import { axios } from '@/lib/axios';

import { User } from '@/features/users/types';
import { handleApiError } from '@/utils/handleApiError';

export const uploadProfileImage = async (profileImage: string): Promise<User> => {
  try {
    const res = await axios.patch(`/users/self/image-upload`, { profileImage });

    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
