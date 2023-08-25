import { Dayjs } from 'dayjs';

export interface UpdateChannelSubscription {
  sectionId: string;
  lastRead?: Dayjs;
  isMuted: boolean;
}
