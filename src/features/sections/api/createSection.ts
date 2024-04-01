import { axios } from '@/lib/axios';
import { CreateSection } from '../types';

export const createSection = async (createSection: CreateSection) => {
  try {
    const { data } = await axios.post('/sections', createSection);

    return data;
  } catch (err) {
    console.error(err);
  }
};
