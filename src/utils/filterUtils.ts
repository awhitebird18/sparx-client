import { ChannelVisibility } from '@/features/channels/enums/channelVisibility';
import { SubscribeStatus } from '@/features/channels/enums/subscribedStatus';
import { Channel } from '@/features/channels/types';

type FilterOptions = {
  filterChannelVisibility: ChannelVisibility | null;
  filterSubscribed: SubscribeStatus | null;
  filterBySearchValue: string;
};

export const filterWorkspaceChannels = (
  workspaceChannels: Channel[],
  subscribedChannels: Channel[],
  filterOptions: FilterOptions,
) => {
  const { filterChannelVisibility, filterSubscribed, filterBySearchValue } = filterOptions;
  let filteredChannels = workspaceChannels;

  if (filterChannelVisibility) {
    filteredChannels = filteredChannels.filter((channel: Channel) => {
      if (filterChannelVisibility === ChannelVisibility.PRIVATE) {
        return channel.isPrivate;
      }
      if (filterChannelVisibility === ChannelVisibility.PUBLIC) {
        return !channel.isPrivate;
      }

      return true;
    });
  }

  if (filterSubscribed === SubscribeStatus.SUBSCSRIBED) {
    filteredChannels = filteredChannels.filter(
      (workspaceChannel: Channel) =>
        !!subscribedChannels.find((el: Channel) => el.uuid === workspaceChannel.uuid),
    );
  }
  if (filterSubscribed === SubscribeStatus.UNSUBSCRIBED) {
    filteredChannels = filteredChannels.filter(
      (workspaceChannel: Channel) =>
        !subscribedChannels.find((el: Channel) => el.uuid === workspaceChannel.uuid),
    );
  }

  if (filterBySearchValue) {
    filteredChannels = filteredChannels.filter((channel: Channel) =>
      channel.name.toLowerCase().includes(filterBySearchValue.toLowerCase()),
    );
  }

  return filteredChannels;
};
