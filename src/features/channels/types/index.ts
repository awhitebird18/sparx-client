import { Dayjs } from 'dayjs';

export type Channel = {
  uuid: string;
  name: string;
  joinedAt?: Dayjs | null;
  createdAt: Dayjs;
  topic: string;
  description: string;
};

export type UpdateChannel = {
  uuid: string;
  name: string;
  topic: string;
  description: string;
};
