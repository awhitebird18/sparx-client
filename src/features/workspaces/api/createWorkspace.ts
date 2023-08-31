import { axios } from '@/lib/axios';

import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';

import { CreateWorkspace } from '../types';

export const createWorkspace = async (createWorkspace: CreateWorkspace) => {
  try {
    const { data } = await axios.post('/workspaces', createWorkspace);

    stores.notificationStore.addNotification({
      title: 'Workspace created',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error creating workspace',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
