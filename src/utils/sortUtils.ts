import dayjs from 'dayjs';

import { Channel } from '@/features/channels/types';
import { SortOptions } from '@/features/channels/enums';

import { SortBy } from '@/components/layout/sidebar/enums';

export const sortChannels = (channels: Channel[], sortBy?: SortBy) => {
  if (sortBy === SortBy.ALPHA) {
    return channels.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === SortBy.RECENT) {
    // assuming you have a 'createdAt' or 'updatedAt' field in Channel
    return channels
      .slice()
      .sort((a, b) => (dayjs(b.createdAt).isBefore(dayjs(a.createdAt)) ? 1 : -1));
  }
  // return original array if no valid sort type
  return channels;
};

export const sortWorkspaceChannels = (workspaceChannels: Channel[], sortBy: SortOptions) => {
  if (sortBy === SortOptions.ATOZ) {
    return workspaceChannels.slice().sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === SortOptions.ZTOA) {
    return workspaceChannels.slice().sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortBy === SortOptions.NEWEST) {
    return workspaceChannels.slice().sort((a, b) => (b.createdAt?.isBefore(a.createdAt) ? 1 : -1));
  }
  if (sortBy === SortOptions.OLDEST) {
    return workspaceChannels.slice().sort((a, b) => (b.createdAt?.isAfter(a.createdAt) ? 1 : -1));
  }
  // if (sortBy === SortOptions.LEASTMEMBERS) {
  //   return channel.slice().sort((a, b) => (a.userCount < b.userCount ? -1 : 1));
  // }
  // if (sortBy === SortOptions.MOSTMEMBERS) {
  //   return channel.slice().sort((a, b) => (a.userCount < b.userCount ? 1 : -1));
  // }

  return workspaceChannels.slice().sort((a, b) => a.name.localeCompare(b.name));
};
