import { WorkspaceChannel } from '@/features/channels';
import { SortBy } from '@/components/layout/sidebar/types';
import dayjs from 'dayjs';
import { SortOptions } from '@/features/channels/types/channelEnums';

export const sortChannels = (workspaceData: WorkspaceChannel[], sortBy?: SortBy) => {
  if (sortBy === SortBy.ALPHA) {
    return workspaceData.sort((a, b) => a.channel.name.localeCompare(b.channel.name));
  } else if (sortBy === SortBy.RECENT) {
    // assuming you have a 'createdAt' or 'updatedAt' field in Channel
    return workspaceData.sort((a, b) =>
      dayjs(b.channel.createdAt).isBefore(dayjs(a.channel.createdAt)) ? 1 : -1,
    );
  }
  // return original array if no valid sort type
  return workspaceData;
};

export const sortWorkspaceChannels = (workspaceData: WorkspaceChannel[], sortBy: SortOptions) => {
  if (sortBy === SortOptions.ATOZ) {
    return workspaceData.slice().sort((a, b) => a.channel.name.localeCompare(b.channel.name));
  }
  if (sortBy === SortOptions.ZTOA) {
    return workspaceData.slice().sort((a, b) => b.channel.name.localeCompare(a.channel.name));
  }

  if (sortBy === SortOptions.NEWEST) {
    return workspaceData
      .slice()
      .sort((a, b) => (b.channel.createdAt?.isBefore(a.channel.createdAt) ? 1 : -1));
  }
  if (sortBy === SortOptions.OLDEST) {
    return workspaceData
      .slice()
      .sort((a, b) => (b.channel.createdAt?.isAfter(a.channel.createdAt) ? 1 : -1));
  }
  if (sortBy === SortOptions.LEASTMEMBERS) {
    return workspaceData.slice().sort((a, b) => (a.userCount < b.userCount ? -1 : 1));
  }
  if (sortBy === SortOptions.MOSTMEMBERS) {
    return workspaceData.slice().sort((a, b) => (a.userCount < b.userCount ? 1 : -1));
  }

  return workspaceData.slice().sort((a, b) => a.channel.name.localeCompare(b.channel.name));
};
