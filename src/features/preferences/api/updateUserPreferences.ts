import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';

import { stores } from '@/stores/RootStore';
import { UserPreferences } from '../types';

export const updateUserPreferencesApi = async (updateFields: Partial<UserPreferences>) => {
  try {
    const { data } = await axios.patch(`/user-preferences`, updateFields);

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error updating user preferences',
      type: NotificationType.ERROR,
      show: true,
    });
  }
};
