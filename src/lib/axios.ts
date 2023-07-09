import Axios, { AxiosInstance } from 'axios';

import { API_URL } from '@/config';

import { stores } from '@/stores/stores';
import { NotificationType } from '@/stores/NotificationStore';

export const axios: AxiosInstance = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    stores.notificationStore.addNotification({
      type: NotificationType.ERROR,
      title: 'Api Error',
      content: message,
    });

    return Promise.reject(error);
  },
);
