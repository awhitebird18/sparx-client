import { axios } from '@/lib/axios';

import { AxiosError } from 'axios';

export const deleteMessageApi = async (messageId: string) => {
  try {
    const res = await axios.delete(`/messages/${messageId}`);

    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError;

    // re-throw the error to be caught and handled elsewhere
    throw new Error(axiosError.message || 'Error fetching messages');
  }
};
