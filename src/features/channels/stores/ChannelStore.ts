import { makeObservable, observable, action } from 'mobx';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // import utc plugin
import timezone from 'dayjs/plugin/timezone'; // import timezone plugin

import { channels } from '@/lib/seeds';
import { Channel, UpdateChannel } from '@/features/channels';

dayjs.extend(utc);
dayjs.extend(timezone);

export class ChannelStore {
  channels: Channel[] = [];
  page = 1;
  pageSize = 10;

  constructor() {
    makeObservable(this, {
      channels: observable,
      page: observable,
      pageSize: observable,
      findById: action,
      addChannel: action,
      updateChannel: action,
      deleteChannel: action,
      fetchChannels: action,
      incrementPage: action,
      setChannels: action,
    });
  }

  findById = (uuid: string) => {
    return this.channels.find((channel: Channel) => channel.uuid === uuid);
  };

  setChannels = (Channels: Channel[]) => {
    this.channels = Channels;
  };

  addChannel = (channel: Channel) => {
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

  fetchChannels = () => {
    this.setChannels(channels);
  };
}
