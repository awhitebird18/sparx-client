import { makeObservable, observable, action } from 'mobx';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // import utc plugin
import timezone from 'dayjs/plugin/timezone'; // import timezone plugin

import { Channel, CreateChannel, UpdateChannel } from '@/features/channels';
import { createChannel } from '../api/createChannel';
import { getSubscribedChannels } from '../api/getSubscribedChannels';
import { getWorkspaceChannels } from '../api/getWorkspaceChannels';
import { joinChannel } from '../api/joinChannel';
import { leaveChannel } from '../api/leaveChannel';
import { updateUserChannel } from '../api/updateUserChannel';
import { updateChannelSection } from '../api/updateChannelSection';

dayjs.extend(utc);
dayjs.extend(timezone);

export class ChannelStore {
  channels: Channel[] = [];
  subscribedChannels: Channel[] = [];
  currentChannel: Channel | null = null;
  page = 1;
  pageSize = 10;
  isLoading = true;

  constructor() {
    makeObservable(this, {
      channels: observable,
      subscribedChannels: observable,
      page: observable,
      pageSize: observable,
      isLoading: observable,
      currentChannel: observable,
      findById: action,
      createChannel: action,
      updateSubscribedChannel: action,
      updateChannel: action,
      deleteChannel: action,
      incrementPage: action,
      setChannels: action,
      fetchSubscribedChannels: action,
    });
  }

  findById = (uuid: string) => {
    return this.channels.find((channel: Channel) => channel.uuid === uuid);
  };

  setChannels = (channels: Channel[]) => {
    this.channels = channels;
  };

  setSubscribedChannels = (channels: Channel[]) => {
    this.subscribedChannels = channels;
  };

  setCurrentChannel = (channel: Channel) => {
    this.currentChannel = channel;
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  createChannel = async (newChannel: CreateChannel) => {
    const channel = await createChannel(newChannel);

    this.subscribedChannels.push(channel);
  };

  updateChannelSection = async (channelId: string, sectionId: string) => {
    const res = await updateChannelSection(channelId, sectionId);

    const index = this.subscribedChannels.findIndex(
      (channel: Channel) => channel.uuid === res.uuid,
    );
    if (index === -1) return null;

    this.subscribedChannels[index] = { ...this.subscribedChannels[index], ...res };
  };

  updateSubscribedChannel = async (channelId: string, updateFields: UpdateChannel) => {
    const updatedChannel = await updateUserChannel(channelId, updateFields);

    const index = this.subscribedChannels.findIndex(
      (channel: Channel) => channel.uuid === updatedChannel.uuid,
    );
    if (index === -1) return null;

    this.subscribedChannels[index] = { ...this.subscribedChannels[index], ...updatedChannel };
  };

  updateChannel = async (channelId: string, updateFields: UpdateChannel) => {
    const updatedChannel = await updateUserChannel(channelId, updateFields);

    const index = this.channels.findIndex(
      (channel: Channel) => channel.uuid === updatedChannel.uuid,
    );
    if (index === -1) return null;

    this.channels[index] = { ...this.channels[index], ...updatedChannel };
  };

  incrementPage = () => {
    this.page = this.page + 1;
  };

  deleteChannel = (uuid: string) => {
    this.channels = this.channels.filter((channel: Channel) => channel.uuid !== uuid);
  };

  fetchChannel = (channelUUID: string) => {
    const currentChannel = this.channels.find((channel: Channel) => channel.uuid === channelUUID);

    if (!currentChannel) return;

    this.setCurrentChannel(currentChannel);
  };

  joinChannel = async (channelId: string) => {
    const channel = await joinChannel(channelId);

    this.subscribedChannels = [...this.subscribedChannels, channel];

    const index = this.channels.findIndex((channel: Channel) => channel.uuid === channelId);
    if (index === -1) return null;

    this.channels[index] = { ...this.channels[index], isSubscribed: true };
  };

  leaveChannel = async (channelId: string) => {
    await leaveChannel(channelId);

    this.subscribedChannels = this.subscribedChannels.filter(
      (channel: Channel) => channel.uuid !== channelId,
    );

    const index = this.channels.findIndex((channel: Channel) => channel.uuid === channelId);
    if (index === -1) return null;

    this.channels[index] = { ...this.channels[index], isSubscribed: false };
  };

  fetchSubscribedChannels = async () => {
    this.setIsLoading(true);

    const channels = await getSubscribedChannels();

    console.info('user-joined channels', channels);

    this.setSubscribedChannels(channels);

    setTimeout(() => {
      this.setIsLoading(false);
    }, 500);
  };

  fetchWorkspaceChannels = async () => {
    this.setIsLoading(true);

    const channels = await getWorkspaceChannels();

    this.setChannels(channels);

    setTimeout(() => {
      this.setIsLoading(false);
    }, 500);
  };
}
