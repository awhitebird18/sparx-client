import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { API_URL } from '@/config';
import { stores } from '@/stores/RootStore';
import { NotificationType } from '@/stores/NotificationStore';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

export const axios: AxiosInstance = Axios.create({
  baseURL: API_URL,
});

let isRefreshing = false;

axios.interceptors.request.use(
  (config: AdaptAxiosRequestConfig) => {
    const token = localStorage.getItem('auth');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh');

    // Check if this request is for refresh token itself
    if (originalRequest.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && refreshToken && !originalRequest._retry) {
      if (isRefreshing) {
        // if isRefreshing is true, then we'll wait until token is refreshed
        // and retry the failed request
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axios(originalRequest));
          }, reject);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Fetch new token using refresh token
        const response = await axios.post('/auth/refresh', { refresh: refreshToken });
        const newToken = response.data.access_token;
        localStorage.setItem('auth', newToken);

        isRefreshing = false;
        onRrefreshed(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (err) {
        console.error('Error refreshing token', err);
        isRefreshing = false;
        return Promise.reject(err); // Reject with the refresh error instead
      }
    }

    const message = error.response?.data?.message || error.message;
    stores.notificationStore.addNotification({
      type: NotificationType.ERROR,
      title: 'Api Error',
      show: true,
      description: message,
    });

    return Promise.reject(error);
  },
);

const subscribers: any[] = [];
function onRrefreshed(token: string) {
  subscribers.map((callback) => callback(token));
}

// callback will be called when the token refresh is done
// and the failed requests are retried
function subscribeTokenRefresh(
  callback: (value: string) => void,
  errorCallback: (value: string) => void,
) {
  subscribers.push(callback);
  subscribers.push(errorCallback);
}
