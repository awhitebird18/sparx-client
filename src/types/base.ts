import { Dayjs } from 'dayjs';

export type Base = {
  uuid: string;
  createdAt: string;
  updatedAt?: Dayjs | string;
};
