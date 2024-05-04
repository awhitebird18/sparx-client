import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Template } from '../types/template';

export const createTemplate = async (title: string, workspaceId: string): Promise<Template> => {
  try {
    const { data } = await axios.post('card-template', { card: { title }, workspaceId });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
