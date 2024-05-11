import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Template } from '../types/template';

export const getTemplates = async (workspaceId: string): Promise<Template[]> => {
  try {
    const { data } = await axios.get(`/card-template/user/${workspaceId}`);

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
