import dayjs from 'dayjs';

import { Channel } from '@/features/channels/types';
import { SortOptions } from '@/features/channels/enums';

import { SortBy } from '@/components/layout/sidebar/enums';
import { ChannelUserCount } from '@/features/workspaceChannels/types/channelUserCount';

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

interface ChannelWithUserCount extends Channel {
  userCount?: number;
}

export const sortWorkspaceChannels = (
  workspaceChannels: Channel[],
  channelUserCounts: ChannelUserCount[],
  sortBy: SortOptions,
): Channel[] => {
  // Map user count to each channel
  const workspaceChannelsWithUserCount: ChannelWithUserCount[] = workspaceChannels.map(
    (channel) => {
      const channelCount = channelUserCounts.find((count) => count.channelUuid === channel.uuid);
      return {
        ...channel,
        userCount: channelCount ? channelCount.userCount : 0,
      };
    },
  );

  if (sortBy === SortOptions.ATOZ) {
    return workspaceChannelsWithUserCount.slice().sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === SortOptions.ZTOA) {
    return workspaceChannelsWithUserCount.slice().sort((a, b) => b.name.localeCompare(a.name));
  }
  if (sortBy === SortOptions.OLDEST) {
    return workspaceChannelsWithUserCount
      .slice()
      .sort((a, b) => (b.createdAt?.isBefore(a.createdAt) ? 1 : -1));
  }
  if (sortBy === SortOptions.NEWEST) {
    return workspaceChannelsWithUserCount
      .slice()
      .sort((a, b) => (b.createdAt?.isAfter(a.createdAt) ? 1 : -1));
  }
  if (sortBy === SortOptions.LEASTMEMBERS) {
    return workspaceChannelsWithUserCount
      .slice()
      .sort((a, b) => (a.userCount || 0) - (b.userCount || 0));
  }
  if (sortBy === SortOptions.MOSTMEMBERS) {
    return workspaceChannelsWithUserCount
      .slice()
      .sort((a, b) => (b.userCount || 0) - (a.userCount || 0));
  }

  return workspaceChannelsWithUserCount.slice().sort((a, b) => a.name.localeCompare(b.name));
};
