import { makeObservable, observable, action } from 'mobx';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // import utc plugin
import timezone from 'dayjs/plugin/timezone'; // import timezone plugin

import { channels, users } from '@/utils/seeds';
import { Channel, CreateChannel, UpdateChannel } from '@/features/channels';
import { User } from '@/features/users';
import { createChannel } from '../api/createChannel';
import { ChannelTypes } from '../types/channelEnums';

dayjs.extend(utc);
dayjs.extend(timezone);

export class ChannelStore {
  channels: Channel[] = [];
  currentChannel: Channel | null = null;
  page = 1;
  pageSize = 10;
  isLoading = true;

  constructor() {
    makeObservable(this, {
      channels: observable,
      page: observable,
      pageSize: observable,
      isLoading: observable,
      currentChannel: observable,
      findById: action,
      createChannel: action,
      updateChannel: action,
      deleteChannel: action,
      fetchChannels: action,
      incrementPage: action,
      setChannels: action,
      fetchChannel: action,
    });
  }

  findById = (uuid: string) => {
    return this.channels.find((channel: Channel) => channel.uuid === uuid);
  };

  setChannels = (Channels: Channel[]) => {
    this.channels = Channels;
  };

  setCurrentChannel = (channel: Channel) => {
    this.currentChannel = channel;
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  createChannel = async (newChannel: CreateChannel) => {
    const channel = await createChannel(newChannel);
    this.channels.push(channel);
  };

  incrementPage = () => {
    this.page = this.page + 1;
  };

  updateChannel = (updatedchannel: UpdateChannel) => {
    const index = this.channels.findIndex(
      (channel: Channel) => channel.uuid === updatedchannel.uuid,
    );
    if (index === -1) return null;

    this.channels[index] = { ...this.channels[index], ...updatedchannel };
  };

  deleteChannel = (uuid: string) => {
    this.channels = this.channels.filter((channel: Channel) => channel.uuid !== uuid);
  };

  fetchChannel = (channelUUID: string) => {
    const currentChannel = channels.find((channel: Channel) => channel.uuid === channelUUID);

    if (!currentChannel) return;

    this.setCurrentChannel(currentChannel);
  };

  fetchChannels = () => {
    this.setIsLoading(true);

    this.setChannels(
      channels.map((channel: Channel) => ({ ...channel, type: ChannelTypes.PUBLIC })),
    );

    setTimeout(() => {
      this.setIsLoading(false);
    }, 500);
  };

  fetchUserChannels = () => {
    this.setIsLoading(true);

    this.setChannels(
      users.map((user: User) => ({
        uuid: user.uuid,
        name: user.displayName,
        joinedAt: dayjs(),
        createdAt: dayjs(),
        topic: '',
        description: '',
        image: user.image,
        type: ChannelTypes.DIRECT,
      })),
    );

    setTimeout(() => {
      this.setIsLoading(false);
    }, 500);
  };
}
