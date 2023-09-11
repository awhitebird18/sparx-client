import { makeObservable, observable, action, computed } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import channelApi from '@/features/channels/api';

import { Channel, CreateChannel, UpdateChannel } from '../types';
import { User } from '@/features/users/types/user';

dayjs.extend(utc);
dayjs.extend(timezone);

export class ChannelStore {
  subscribedChannels: Channel[] = [];
  currentChannelId: string | undefined;
  channelUserIds: string[] = [];
  isLoading = true;

  constructor() {
    makeObservable(this, {
      subscribedChannels: observable,
      currentChannelId: observable,
      channelUserIds: observable,
      isLoading: observable,
      currentChannel: computed,
      getChannelByUuid: computed,
      findChannelByUuid: action,
      setChannelUsers: action,
      updateSubscribedChannel: action,
      setCurrentChannelUuid: action,
      setSubscribedChannels: action,
      addSubscribedChannel: action,
      setIsLoading: action,
      createChannelApi: action,
      updateChannelApi: action,
      fetchSubscribedChannelsApi: action,
      joinChannelApi: action,
      leaveChannelApi: action,
      fetchChannelUserIdsApi: action,
    });
  }

  // Todo: computed value happens when the chatroom is entered. However, does not
  // occur when the join channel button is clicked.
  get currentChannel(): Channel | undefined {
    const channel = this.subscribedChannels.find(
      (channel) => channel.uuid === this.currentChannelId,
    );

    return channel;
  }

  get getChannelByUuid() {
    return (uuid: string) => {
      return this.subscribedChannels.find((channel) => channel.uuid === uuid);
    };
  }
  filterTempChannels = () => {
    this.subscribedChannels = this.subscribedChannels.filter((el: Channel) => !el.isTemp);
  };

  findChannelByUuid = (uuid: string) => {
    return this.subscribedChannels.find((channel: Channel) => channel.uuid === uuid);
  };

  findTempChannel = () => {
    return this.subscribedChannels.find((el: Channel) => el.isTemp);
  };

  setSubscribedChannels = (channels: Channel[]) => {
    this.subscribedChannels = channels;
  };

  setCurrentChannelUuid = (channelUuid: string | undefined) => {
    this.currentChannelId = channelUuid;
  };

  addSubscribedChannel = (channel: Channel) => {
    if (this.findChannelByUuid(channel.uuid)) return;

    this.subscribedChannels.push(channel);
  };

  updateSubscribedChannel = (udpatedChannel: Channel) => {
    const channelFound = this.subscribedChannels.find(
      (channel) => channel.uuid === udpatedChannel.uuid,
    );

    if (!channelFound) return;

    Object.assign(channelFound, udpatedChannel);
  };

  removeSubscribedChannel = (uuid: string) => {
    this.subscribedChannels = this.subscribedChannels.filter(
      (channel: Channel) => channel.uuid !== uuid,
    );
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  inviteUsersToChannelApi = async (channelUuid: string, users: User[]) => {
    const userIds = users.map((user: User) => user.uuid);
    await channelApi.inviteUsersToChannel(channelUuid, userIds);
  };

  createChannelApi = async (createChannel: CreateChannel, sectionId: string) => {
    const channel = await channelApi.createChannel(createChannel, sectionId);
    this.addSubscribedChannel(channel);
    return channel;
  };

  createDirectChannelApi = async (channelUserIds: string[]) => {
    const channel = await channelApi.createDirectChannel(channelUserIds);

    this.addSubscribedChannel(channel);
    return channel;
  };

  joinChannelApi = async ({ channelId, sectionId }: { channelId: string; sectionId: string }) => {
    const channel = await channelApi.joinChannel({ channelId, sectionId });

    this.addSubscribedChannel(channel);
  };

  leaveChannelApi = async (channelUuid: string) => {
    await channelApi.leaveChannel(channelUuid);
    this.removeSubscribedChannel(channelUuid);
  };

  removeUserFromChannelApi = async (channelUuid: string, userUuid: string) => {
    await channelApi.removeUserFromChannel(channelUuid, userUuid);
  };

  updateChannelApi = async (uuid: string, updateChannel: UpdateChannel) => {
    const updatedChannel = await channelApi.updateChannel(uuid, updateChannel);
    this.updateSubscribedChannel(updatedChannel);
  };

  setChannelUsers = (channelUserIds: string[]) => {
    this.channelUserIds = channelUserIds;
  };

  fetchChannelUserIdsApi = async (channelId: string) => {
    const userIds = await channelApi.getChannelUsers(channelId);

    this.setChannelUsers(userIds);
  };

  fetchSubscribedChannelsApi = async () => {
    this.setIsLoading(true);
    const channels = await channelApi.getSubscribedChannels();
    this.setSubscribedChannels([
      ...channels.map((channel: Channel) => ({
        ...channel,
        createdAt: dayjs(channel.createdAt),
        updatedAt: dayjs(channel.updatedAt),
      })),
    ]);
    this.setIsLoading(false);
  };
}
