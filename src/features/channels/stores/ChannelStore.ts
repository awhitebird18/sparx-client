import { makeObservable, observable, action, computed } from 'mobx';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // import utc plugin
import timezone from 'dayjs/plugin/timezone'; // import timezone plugin

import { Channel, CreateChannel, UpdateChannel } from '@/features/channels';
import { createChannel } from '../api/createChannel';
import { getSubscribedChannels } from '../api/getSubscribedChannels';
import { getWorkspaceChannels } from '../api/getWorkspaceChannels';
import { updateChannelSection } from '../api/updateChannelSection';

dayjs.extend(utc);
dayjs.extend(timezone);

export class ChannelStore {
  channels: Channel[] = [];
  subscribedChannels: Channel[] = [];
  currentChannelId: string | undefined;
  page = 1;
  pageSize = 10;
  isLoading = true;

  constructor() {
    makeObservable(this, {
      channels: observable,
      subscribedChannels: observable,
      currentChannelId: observable,
      page: observable,
      pageSize: observable,
      isLoading: observable,
      currentChannel: computed,
      findById: action,
      createChannel: action,
      updateSubscribedChannel: action,
      updateChannel: action,
      removeChannel: action,
      incrementPage: action,
      setChannels: action,
      fetchSubscribedChannels: action,
      fetchWorkspaceChannels: action,
      setCurrentChannelId: action,
      setSubscribedChannels: action,
      setIsLoading: action,
      updateChannelSection: action,
      joinChannel: action,
      leaveChannel: action,
    });
  }

  get currentChannel(): Channel | undefined {
    return this.subscribedChannels.find((channel) => channel.uuid === this.currentChannelId);
  }

  findById = (uuid: string) => {
    return this.subscribedChannels.find((channel: Channel) => channel.uuid === uuid);
  };

  setChannels = (channels: Channel[]) => {
    this.channels = channels;
  };

  addChannel = (channel: Channel) => {
    const channelFound = this.channels.find((channel: Channel) => channel.uuid === channel.uuid);
    if (channelFound) return;
    this.channels.push(channel);
  };

  setSubscribedChannels = (channels: Channel[]) => {
    this.subscribedChannels = channels;
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  createChannel = async (newChannel: CreateChannel) => {
    const channel = await createChannel(newChannel);

    this.subscribedChannels.push(channel);
  };

  setCurrentChannelId = (channelId: string) => {
    this.currentChannelId = channelId;
  };

  updateChannelSection = async (channelId: string, sectionId: string) => {
    const res = await updateChannelSection(channelId, sectionId);

    const index = this.subscribedChannels.findIndex(
      (channel: Channel) => channel.uuid === res.uuid,
    );
    if (index === -1) return null;

    this.subscribedChannels[index] = { ...this.subscribedChannels[index], ...res };
  };

  updateSubscribedChannel = async (channelId: string, updatedFields: UpdateChannel) => {
    const channel = this.subscribedChannels.find((channel) => channel.uuid === channelId);

    if (channel) {
      Object.assign(channel, updatedFields);
    }
  };

  handleUpdateSubscribedChannelSocket = (channel: Channel) => {
    this.updateSubscribedChannel(channel.uuid, channel);
  };

  updateChannel = async (channelId: string, updatedFields: UpdateChannel) => {
    const channel = this.channels.find((channel) => channel.uuid === channelId);

    if (channel) {
      Object.assign(channel, updatedFields);
    }
  };

  incrementPage = () => {
    this.page = this.page + 1;
  };

  removeChannel = (uuid: string) => {
    this.channels = this.channels.filter((channel: Channel) => channel.uuid !== uuid);
  };

  joinChannel = async (channel: Channel) => {
    const channelFound = this.findById(channel.uuid);

    if (channelFound) return;

    this.subscribedChannels = [...this.subscribedChannels, channel];
    this.updateChannel(channel.uuid, { isSubscribed: true });
  };

  leaveChannel = async (channelId: string) => {
    console.log(
      channelId,
      this.subscribedChannels.filter((channel: Channel) => channel.uuid !== channelId),
    );
    this.subscribedChannels = this.subscribedChannels.filter(
      (channel: Channel) => channel.uuid !== channelId,
    );

    this.updateChannel(channelId, { isSubscribed: false });
  };

  fetchSubscribedChannels = async () => {
    this.setIsLoading(true);
    const channels = await getSubscribedChannels();
    this.setSubscribedChannels(channels);
    this.setIsLoading(false);
  };

  fetchWorkspaceChannels = async () => {
    this.setIsLoading(true);
    const channels = await getWorkspaceChannels();
    this.setChannels(channels);
    this.setIsLoading(false);
  };
}
