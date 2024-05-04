import { makeAutoObservable } from 'mobx';
import channelApi from '@/features/channels/api';
import { ChannelUnread } from '../types';

export class ChannelUnreadStore {
  channelUnreads: ChannelUnread[] = [];

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  // Computed Values
  get channelUnreadsCount() {
    return this.channelUnreads.reduce(
      (prev: number, curr: ChannelUnread) => prev + curr.unreadCount,
      0,
    );
  }

  get findChannelUnreads() {
    return (channelId: string) => {
      return this.channelUnreads.find(
        (channelUnread: ChannelUnread) => channelUnread.channelId === channelId,
      );
    };
  }

  // Setters
  setChannelUnreads = (channelUnreads: ChannelUnread[]) => {
    this.channelUnreads = channelUnreads;
  };

  clearChannelUnreads = (channelId: string) => {
    this.channelUnreads = this.channelUnreads.filter(
      (channelUnread: ChannelUnread) => channelUnread.channelId !== channelId,
    );
  };

  incrementChannelUnreads = (channelId: string) => {
    const channelUnread = this.findChannelUnreads(channelId);
    if (channelUnread) {
      channelUnread.unreadCount += 1;
    } else {
      this.channelUnreads.push({ channelId, unreadCount: 1 });
    }
  };

  // Update
  updateUnreadCountApi = async (channelId: string) => {
    await channelApi.updateLastRead(channelId);
  };
}
