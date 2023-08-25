import { makeObservable, observable, action, computed } from 'mobx';

import { ChannelUnread } from '../types';

export class ChannelUnreadStore {
  channelUnreads: ChannelUnread[] = [];

  constructor() {
    makeObservable(this, {
      channelUnreads: observable,
      incrementChannelUnreads: action,
      setChannelUnreads: action,
      clearChannelUnreads: action,
      channelUnreadsCount: computed,
      findChannelUnreads: computed,
    });
  }

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

  setChannelUnreads = (channelUnreads: ChannelUnread[]) => {
    this.channelUnreads = channelUnreads;
  };

  incrementChannelUnreads = (channelId: string) => {
    const channelUnread = this.findChannelUnreads(channelId);

    if (channelUnread) {
      channelUnread.unreadCount += 1;
    } else {
      this.channelUnreads.push({ channelId, unreadCount: 1 });
    }
  };

  clearChannelUnreads = (channelId: string) => {
    this.channelUnreads = this.channelUnreads.filter(
      (channelUnread: ChannelUnread) => channelUnread.channelId !== channelId,
    );
  };
}
