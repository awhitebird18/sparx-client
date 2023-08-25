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
  filterOptions: FilterOptions,
) => {
  const { filterChannelVisibility, filterSubscribed, filterBySearchValue } = filterOptions;
  let filteredChannels = workspaceChannels;
  console.log(workspaceChannels);

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

  if (filterSubscribed) {
    // filteredChannels = filteredChannels.filter(
    //   (workspaceChannel: WorkspaceChannel) =>
    //     // Todo: channel does not have isSubscribed property
    //     workspaceChannel.channel.isSubscribed ===
    //     (filterSubscribed === SubscribeStatus.SUBSCSRIBED),
    // );
  }

  if (filterBySearchValue) {
    filteredChannels = filteredChannels.filter((channel: Channel) =>
      channel.name.toLowerCase().includes(filterBySearchValue.toLowerCase()),
    );
  }

  console.log(filteredChannels);

  return filteredChannels;
};
