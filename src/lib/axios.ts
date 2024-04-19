import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import authApi from '@/features/auth/api';
import { stores } from '@/stores/RootStore';

const API_URL = import.meta.env.VITE_API_URL;

export const axios: AxiosInstance = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  async (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest.url.endsWith('/auth/refresh')) {
      await authApi.logout();

      stores.userPreferencesStore.resetPreferences();

      localStorage.clear();

      return Promise.reject(error);
    }

    if (!originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post('/auth/refresh');

        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
