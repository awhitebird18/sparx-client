import { axios } from '@/lib/axios';

import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';

import { UpdateUserPreferences } from '../types/updateUserPreference';
import { UserPreferences } from '../types';

export const updateUserPreferences = async (
  updateFields: UpdateUserPreferences,
): Promise<UserPreferences> => {
  try {
    const { data } = await axios.patch(`/user-preferences`, updateFields);

    return data;
  } catch (err) {
    stores.notificationStore.addNotification({
      title: 'Error updating user preferences',
      type: NotificationType.ERROR,
      show: true,
    });

    throw err;
  }
};
