import { Dayjs } from 'dayjs';

export interface CreateMesssage {
  uuid: string;
  content: string;
  channelId: string;
  userId: string;
  createdAt: Dayjs;
  isSystem?: boolean;
}
