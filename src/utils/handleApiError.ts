// errorHandler.ts
import { AxiosError } from 'axios';
import { stores } from '@/stores/RootStore';
import { NotificationType } from '@/stores/NotificationStore';
import Logger from '@/utils/logger';

export const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError;
  const errorMessage = axiosError.message || 'An unexpected error occurred';

  Logger.error(errorMessage);

  stores.notificationStore.addNotification({
    title: 'Something went wrong!',
    description: errorMessage,
    type: NotificationType.ERROR,
    show: true,
  });

  throw new Error(errorMessage);
};
