// errorHandler.ts
import { AxiosError } from 'axios';
import Logger from '@/utils/logger';

export const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError;
  const errorMessage = axiosError.message || 'An unexpected error occurred';

  Logger.error(errorMessage);

  throw new Error(errorMessage);
};
