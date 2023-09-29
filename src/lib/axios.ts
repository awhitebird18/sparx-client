import Axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const axios: AxiosInstance = Axios.create({
  baseURL: API_URL,
  withCredentials: true, // This is important for sending the cookies
});

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or it is a request for the refresh token itself, just reject
    if (
      originalRequest.url === '/auth/refresh' ||
      error.response.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // A call to some endpoint that will refresh the token using HttpOnly cookies
      await axios.post('/auth/refresh');
      return axios(originalRequest);
    } catch (err) {
      // If refresh also fails, probably redirect to login page or show some error to the user
      return Promise.reject(err);
    }
  },
);
