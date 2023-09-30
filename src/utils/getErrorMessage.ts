import { AxiosError } from 'axios';

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) return error.message;
  return String(error);
}
