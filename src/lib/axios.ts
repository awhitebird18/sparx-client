import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_URL } from '@/config';

export const axios: AxiosInstance = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // If request is for refresh token itself or error is not 401, just reject
    if (
      originalRequest.url === '/auth/refresh' ||
      error.response.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // if isRefreshing is true, then we'll wait until token is refreshed
      // and retry the failed request
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh(() => {
          resolve(axios(originalRequest));
        }, reject);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Request to refresh the token. The back-end should update the httpOnly cookie in the response.
      await axios.post('/auth/refresh');
      isRefreshing = false;
      onRrefreshed(); // Just notify, no new token to pass since it's in httpOnly cookie

      return axios(originalRequest);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      isRefreshing = false;

      // Check if the error is due to a 401 response from the /auth/refresh endpoint
      if (err.response.status === 401 && err.config.url === '/auth/refresh') {
        // You can handle it gracefully here, maybe by redirecting the user to a login page, or showing an appropriate message.
        // For this example, we simply return a failed promise with a custom message:
        return Promise.reject('Token refresh attempt failed with 401.');
      }

      return Promise.reject(err); // Reject with the refresh error instead
    }
  },
);

const subscribers: Array<(value?: string) => void> = [];
function onRrefreshed(token?: string) {
  subscribers.map((callback) => callback(token));
}

function subscribeTokenRefresh(
  callback: (value?: string) => void,
  errorCallback: (value?: string) => void,
) {
  subscribers.push(callback);
  subscribers.push(errorCallback);
}
