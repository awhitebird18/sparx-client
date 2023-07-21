import { axios } from '@/lib/axios';
import { Section } from '..';

export const getSections = async (): Promise<Section[]> => {
  try {
    const res = await axios.get('/sections');

    return res.data;
  } catch (err) {
    console.error(err);

    return [];
  }
};
