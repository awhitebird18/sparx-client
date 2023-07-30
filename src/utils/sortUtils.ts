import { Channel } from '@/features/channels';
import { SortBy } from '@/components/layout/sidebar/types';
import dayjs from 'dayjs';

export const sortChannels = (channels: Channel[], sortBy?: SortBy) => {
  if (sortBy === SortBy.ALPHA) {
    return channels.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === SortBy.RECENT) {
    // assuming you have a 'createdAt' or 'updatedAt' field in Channel
    return channels.sort((a, b) => (dayjs(b.createdAt).isBefore(dayjs(a.createdAt)) ? 1 : -1));
  }
  // return original array if no valid sort type
  return channels;
};
