import { Dayjs } from 'dayjs';

export type Base = {
  uuid: string;
  createdAt: Dayjs | string;
  updatedAt?: Dayjs | string;
};
