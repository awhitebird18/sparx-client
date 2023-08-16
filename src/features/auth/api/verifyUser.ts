import { axios } from '@/lib/axios';

export const verifyUser = async () => {
  try {
    const { data } = await axios.post('/auth/verify');

    return data;
  } catch (err) {
    console.error(err);
  }
};
