import { ChannelPrivateEnum, SubscribeStatusEnum } from '@/features/channels/types/channelEnums';
import { Channel } from '@/features/channels';

type FilterOptions = {
  filterChannelType: ChannelPrivateEnum | null;
  filterSubscribed: SubscribeStatusEnum | null;
  filterBySearchValue: string;
};

export const filterWorkspaceChannels = (channels: Channel[], filterOptions: FilterOptions) => {
  const { filterChannelType, filterSubscribed, filterBySearchValue } = filterOptions;
  let filteredChannels = channels;

  if (filterChannelType) {
    filteredChannels = filteredChannels.filter((channel: Channel) => {
      if (filterChannelType === ChannelPrivateEnum.PRIVATE) {
        return channel.isPrivate;
      }
      if (filterChannelType === ChannelPrivateEnum.PUBLIC) {
        return !channel.isPrivate;
      }

      return true;
    });
  }

  if (filterSubscribed) {
    filteredChannels = filteredChannels.filter(
      (channel) => channel.isSubscribed === (filterSubscribed === SubscribeStatusEnum.SUBSCSRIBED),
    );
  }

  if (filterBySearchValue) {
    filteredChannels = filteredChannels.filter((channel: Channel) =>
      channel.name.toLowerCase().includes(filterBySearchValue.toLowerCase()),
    );
  }

  return filteredChannels;
};
