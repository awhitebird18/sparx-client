import { Channel } from '@/features/channels';
import { SortBy } from '@/components/layout/sidebar/types';
import dayjs from 'dayjs';
import { SortOptions } from '@/features/channels/types/channelEnums';

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

export const sortWorkspaceChannels = (channels: Channel[], sortBy: SortOptions) => {
  if (sortBy === SortOptions.ATOZ) {
    return channels.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === SortOptions.ZTOA) {
    return channels.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortBy === SortOptions.NEWEST) {
    return channels.sort((a, b) => (b.createdAt.isBefore(a.createdAt) ? 1 : -1));
  }
  if (sortBy === SortOptions.OLDEST) {
    return channels.sort((a, b) => (b.createdAt.isAfter(a.createdAt) ? 1 : -1));
  }
  if (sortBy === SortOptions.LEASTMEMBERS) {
    console.info('Need to implement');
  }
  if (sortBy === SortOptions.MOSTMEMBERS) {
    console.info('Need to implement');
  }

  return channels.sort((a, b) => a.name.localeCompare(b.name));
};
