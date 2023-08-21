import { ChannelPrivateEnum, SubscribeStatusEnum } from '@/features/channels/types/channelEnums';
import { WorkspaceChannel } from '@/features/channels';

type FilterOptions = {
  filterChannelType: ChannelPrivateEnum | null;
  filterSubscribed: SubscribeStatusEnum | null;
  filterBySearchValue: string;
};

export const filterWorkspaceChannels = (
  workspaceData: WorkspaceChannel[],
  filterOptions: FilterOptions,
) => {
  const { filterChannelType, filterSubscribed, filterBySearchValue } = filterOptions;
  let filteredChannels = workspaceData;

  if (filterChannelType) {
    filteredChannels = filteredChannels.filter((workspaceChannel: WorkspaceChannel) => {
      if (filterChannelType === ChannelPrivateEnum.PRIVATE) {
        return workspaceChannel.channel.isPrivate;
      }
      if (filterChannelType === ChannelPrivateEnum.PUBLIC) {
        return !workspaceChannel.channel.isPrivate;
      }

      return true;
    });
  }

  if (filterSubscribed) {
    filteredChannels = filteredChannels.filter(
      (workspaceChannel: WorkspaceChannel) =>
        workspaceChannel.channel.isSubscribed ===
        (filterSubscribed === SubscribeStatusEnum.SUBSCSRIBED),
    );
  }

  if (filterBySearchValue) {
    filteredChannels = filteredChannels.filter((workspaceChannel: WorkspaceChannel) =>
      workspaceChannel.channel.name.toLowerCase().includes(filterBySearchValue.toLowerCase()),
    );
  }

  return filteredChannels;
};
