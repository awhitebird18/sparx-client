import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import authApi from '@/features/auth/api';
import { stores } from '@/stores/RootStore';

const API_URL = import.meta.env.VITE_API_URL;

export const axios: AxiosInstance = Axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for sending cookies.
});

axios.interceptors.response.use(
  async (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Directly reject if it's not a 401 error.
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // If the failed request is to the 'auth/refresh' endpoint, handle logout and local storage clearing immediately.
    if (originalRequest.url.endsWith('/auth/refresh')) {
      // Perform logout using your authApi's logout function.
      // Make sure this action doesn't lead back into the interceptor in a way that could cause a loop.
      await authApi.logout();

      stores.userPreferencesStore.resetPreferences();

      // Clear local storage.
      localStorage.clear(); // Clears everything. You can also selectively remove items.

      // Redirect to login page or handle the error as necessary.
      // window.location.href = '/login';

      // Reject the promise, effectively stopping the process here.
      return Promise.reject(error);
    }

    // For other requests with a 401 error, attempt a token refresh.
    if (!originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried.

      try {
        // Attempt to refresh the token.
        await axios.post('/auth/refresh');
        // If successful, retry the original request.
        return axios(originalRequest);
      } catch (err) {
        // If the refresh attempt fails, it's caught here.
        return Promise.reject(err);
      }
    }

    // For any situation not already handled, reject the promise.
    return Promise.reject(error);
  },
);
