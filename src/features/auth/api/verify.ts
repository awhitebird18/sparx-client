import { axios } from '@/lib/axios';

export const verify = async () => {
  try {
    const { data } = await axios.get('/auth/client-boot');

    return data;
  } catch (err) {
    console.error(err);
  }
};
