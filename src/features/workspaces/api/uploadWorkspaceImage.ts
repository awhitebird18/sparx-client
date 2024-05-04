import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';
import { Workspace } from '../types/workspace';

export const uploadWorkspaceImage = async (
  workspaceId: string,
  workspaceImg: string,
): Promise<Workspace> => {
  try {
    const { data } = await axios.patch(`/workspaces/${workspaceId}/image-upload`, {
      imgUrl: workspaceImg,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
