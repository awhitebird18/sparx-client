import { Dayjs } from 'dayjs';

export type BaseEntity = {
  uuid: string;
  createdAt: Dayjs;
  updatedAt?: Dayjs;
  deletedAt?: Dayjs;
};
