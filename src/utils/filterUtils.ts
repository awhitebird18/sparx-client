import { ChannelFilters } from '@/features/channels/types/channelEnums';
import { Channel } from '@/features/channels';

export const filterByChannelType = (channels: Channel[], filterBy: ChannelFilters | null) => {
  if (filterBy === ChannelFilters.PRIVATE) {
    return channels.filter((channel: Channel) => channel.isPrivate);
  }

  if (filterBy === ChannelFilters.PUBLIC) {
    return channels.filter((channel: Channel) => !channel.isPrivate);
  }

  return channels;
};
