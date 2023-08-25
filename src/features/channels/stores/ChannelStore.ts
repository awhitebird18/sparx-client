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
  tempChannelId?: string;
  currentChannelId: string | undefined;
  isLoading = true;

  constructor() {
    makeObservable(this, {
      subscribedChannels: observable,
      currentChannelId: observable,
      isLoading: observable,
      currentChannel: computed,
      getChannelByUuid: computed,
      findChannelByUuid: action,
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
    });
  }

  get currentChannel(): Channel | undefined {
    return this.subscribedChannels.find((channel) => channel.uuid === this.currentChannelId);
  }

  get getChannelByUuid() {
    return (uuid: string) => {
      return this.subscribedChannels.find((channel) => channel.uuid === uuid);
    };
  }

  findChannelByUuid = (uuid: string) => {
    return this.subscribedChannels.find((channel: Channel) => channel.uuid === uuid);
  };

  setSubscribedChannels = (channels: Channel[]) => {
    this.subscribedChannels = channels;
  };

  setCurrentChannelUuid = (channelUuid: string | undefined) => {
    this.currentChannelId = channelUuid;
  };

  addSubscribedChannel = (channel: Channel) => {
    this.subscribedChannels.push(channel);
  };

  updateSubscribedChannel = (udpatedChannel: Channel) => {
    const index = this.subscribedChannels.findIndex(
      (channel) => channel.uuid === udpatedChannel.uuid,
    );

    if (index === -1) return;

    this.subscribedChannels.splice(index, 1, udpatedChannel);
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

  createChannelApi = async (createChannel: CreateChannel) => {
    const channel = await channelApi.createChannel(createChannel);
    this.addSubscribedChannel(channel);
  };

  joinChannelApi = async (channelId: string) => {
    const channel = await channelApi.joinChannel(channelId);
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
