import { axios } from '@/lib/axios';
import { AxiosError } from 'axios';
import { User } from '..';

export const uploadProfileImage = async (userId: string, profileImage: string): Promise<User> => {
  try {
    const res = await axios.patch(`/users/${userId}/image-upload`, { profileImage });

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    throw new Error(axiosError.message || 'Error fetching users');
  }
};
