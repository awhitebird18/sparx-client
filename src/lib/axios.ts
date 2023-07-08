import Axios from 'axios';

import { API_URL } from '@/config';

import { stores } from '@/stores/stores';
import { NotificationType } from '@/stores/NotificationStore';

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
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
