import { makeObservable, observable, action, computed, reaction } from 'mobx';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {
  Channel,
  ChannelUnread,
  CreateChannel,
  UpdateChannel,
  UserTyping,
} from '@/features/channels';
import { createChannel } from '../api/createChannel';
import { getSubscribedChannels } from '../api/getSubscribedChannels';
import { getWorkspaceChannels } from '../api/getWorkspaceChannels';
import { updateChannelSection } from '../api/updateChannelSection';
import { updateUserChannel } from '../api/updateUserChannel';
import { filterWorkspaceChannels } from '@/utils/filterUtils';
import { sortWorkspaceChannels } from '@/utils/sortUtils';
import {
  ChannelPrivateEnum,
  ChannelTypes,
  SortOptions,
  SubscribeStatusEnum,
} from '../types/channelEnums';

dayjs.extend(utc);
dayjs.extend(timezone);

export class ChannelStore {
  channels: Channel[] = [];
  subscribedChannels: Channel[] = [];
  currentChannelId: string | undefined;
  page = 1;
  pageSize = 10;
  isLoading = true;
  channelUnreads: ChannelUnread[] = [];
  hasMore = true;
  filterSubscribed: SubscribeStatusEnum | null = null;
  filterBySearchValue = '';
  filterChannelType: ChannelPrivateEnum | null = null;
  sortBy: SortOptions = SortOptions.ATOZ;
  usersTyping: UserTyping[] = [];

  constructor() {
    makeObservable(this, {
      channels: observable,
      subscribedChannels: observable,
      currentChannelId: observable,
      channelUnreads: observable,
      usersTyping: observable,
      sortBy: observable,
      page: observable,
      pageSize: observable,
      hasMore: observable,
      filterSubscribed: observable,
      filterBySearchValue: observable,
      filterChannelType: observable,
      isLoading: observable,
      currentChannel: computed,
      getChannelById: computed,
      findById: action,
      addUserTyping: action,
      removeUserTyping: action,
      clearUsersTyping: action,
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
      addSubscribedChannel: action,
      findChannelUnreads: computed,
      channelUnreadsCount: computed,
      setIsLoading: action,
      setSortBy: action,
      updateChannelSection: action,
      addToChannelUnreads: action,
      setFilterChannelType: action,
      setFilterSubscribed: action,
      setFilterBySearchValue: action,
      joinChannel: action,
      leaveChannel: action,
      filteredAndSortedChannels: computed,
    });

    reaction(
      () => this.currentChannel,
      (channel, previousChannel) => {
        if (channel?.uuid === previousChannel?.uuid) return;

        if (channel?.type === ChannelTypes.DIRECT || previousChannel?.type === ChannelTypes.DIRECT)
          return;
        if (channel && !channel.isTemp) {
          this.markChannelAsRead(channel.uuid);
        }

        if (!previousChannel) return;

        if (previousChannel.isTemp) {
          this.removeSubscribedChannel(previousChannel.uuid);
        } else {
          this.markChannelAsRead(previousChannel.uuid);
        }
      },
    );
  }

  clearUsersTyping = () => {
    this.usersTyping = [];
  };

  addUserTyping = (data: UserTyping) => {
    let userTypingIndex = this.usersTyping.findIndex(
      (userTyping: UserTyping) => userTyping.userId === data.userId,
    );

    if (userTypingIndex > -1 && this.usersTyping[userTypingIndex]?.timerId) {
      // If the user is already typing, clear the existing timer
      clearTimeout(this.usersTyping[userTypingIndex].timerId);
    } else {
      // If it's a new user, add them to the list
      this.usersTyping.push(data);
      // Update the index to point to the newly added user
      userTypingIndex = this.usersTyping.length - 1;
    }

    // Set a new timer to remove the user after 5 seconds of inactivity
    this.usersTyping[userTypingIndex].timerId = setTimeout(() => {
      this.removeUserTyping(data.userId);
    }, 3000);
  };

  removeUserTyping = (userId: string) => {
    const userTypingIndex = this.usersTyping.findIndex(
      (userTyping: UserTyping) => userTyping.userId === userId,
    );

    if (userTypingIndex > -1) {
      // If the user is found, remove them from the list
      this.usersTyping.splice(userTypingIndex, 1);
    }
  };

  setSortBy = (sortBy: SortOptions) => {
    this.sortBy = sortBy;
  };

  setFilterChannelType = (channelType: ChannelPrivateEnum | null) => {
    this.filterChannelType = channelType;
  };

  setFilterSubscribed = (subscribedType: SubscribeStatusEnum | null) => {
    this.filterSubscribed = subscribedType;
  };

  setFilterBySearchValue = (value: string) => {
    this.filterBySearchValue = value;
  };

  setChannelUnreads = (channelUnreads: ChannelUnread[]) => {
    if (channelUnreads) {
      this.channelUnreads = channelUnreads;
    }
  };

  get channelUnreadsCount() {
    return this.channelUnreads.reduce(
      (prev: number, curr: ChannelUnread) => prev + curr.unreadCount,
      0,
    );
  }

  get filteredAndSortedChannels() {
    const mappedChannels = this.channels.map((channel: Channel) => ({
      ...channel,
      isSubscribed: Boolean(this.findById(channel.uuid)),
    }));
    const filteredChannels = filterWorkspaceChannels(mappedChannels, {
      filterSubscribed: this.filterSubscribed,
      filterBySearchValue: this.filterBySearchValue,
      filterChannelType: this.filterChannelType,
    });
    return sortWorkspaceChannels(filteredChannels, this.sortBy);
  }

  get findChannelUnreads() {
    return (channelId: string) => {
      return this.channelUnreads.find(
        (channelUnread: ChannelUnread) => channelUnread.channelId === channelId,
      );
    };
  }

  addToChannelUnreads = (channelId: string) => {
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

  markChannelAsRead = async (channelId: string) => {
    const result = await updateUserChannel(channelId, { lastRead: dayjs().toISOString() });

    this.updateSubscribedChannel(channelId, { lastRead: result.lastRead });
  };

  get currentChannel(): Channel | undefined {
    return this.subscribedChannels.find((channel) => channel.channelId === this.currentChannelId);
  }

  findById = (uuid: string) => {
    return this.subscribedChannels.find((channel: Channel) => channel.uuid === uuid);
  };

  findfindWorkspaceChannelByIdById = (uuid: string) => {
    return this.channels.find((channel: Channel) => channel.uuid === uuid);
  };

  get getChannelById() {
    return (id: string) => {
      return this.subscribedChannels.find((channel) => channel.uuid === id);
    };
  }

  setChannels = (channels: Channel[]) => {
    this.channels = channels;
  };

  addChannel = (channel: Channel) => {
    const channelFound = this.channels.find(
      (channelEl: Channel) => channelEl.uuid === channel.uuid,
    );
    if (channelFound) return;
    this.channels.push(channel);
  };

  addChannels = (channels: Channel[]) => {
    this.channels.push(...channels);
  };

  setSubscribedChannels = (channels: Channel[]) => {
    this.subscribedChannels = channels;
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  addSubscribedChannel = (channel: Channel) => {
    this.subscribedChannels.push(channel);
  };

  createChannel = async (newChannel: CreateChannel) => {
    const channel = await createChannel(newChannel);

    this.addSubscribedChannel(channel);
  };

  setCurrentChannelId = (channelId: string | undefined) => {
    this.currentChannelId = channelId;
  };

  setHasMore(bool: boolean) {
    this.hasMore = bool;
  }

  updateChannelSection = async (channelId: string, sectionId: string) => {
    const res = await updateChannelSection(channelId, sectionId);

    const index = this.subscribedChannels.findIndex(
      (channel: Channel) => channel.uuid === res.uuid,
    );
    if (index === -1) return null;

    this.subscribedChannels[index] = { ...this.subscribedChannels[index], ...res };
  };

  updateSubscribedChannel = async (channelId: string, updatedFields: UpdateChannel) => {
    this.subscribedChannels = this.subscribedChannels.map((channel) =>
      channel.uuid === channelId ? { ...channel, ...updatedFields } : channel,
    );
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

  removeSubscribedChannel = (uuid: string) => {
    this.subscribedChannels = this.subscribedChannels.filter(
      (channel: Channel) => channel.uuid !== uuid,
    );
  };

  updateWorkspaceChannel = (channelId: string, updatedChannelFields: UpdateChannel) => {
    const channel = this.channels.find((channel: Channel) => channel.uuid === channelId);

    if (!channel) return;

    Object.assign(channel, updatedChannelFields);
  };

  joinChannel = async (channel: Channel) => {
    const channelFound = this.findById(channel.uuid);

    if (channelFound) return;

    this.subscribedChannels = [...this.subscribedChannels, channel];

    this.updateChannel(channel.uuid, { isSubscribed: true });

    const workspaceChannel = this.channels.find((el: Channel) => el.uuid === channel.uuid);
    if (!workspaceChannel || !workspaceChannel.userCount) return;

    this.updateWorkspaceChannel(workspaceChannel.uuid, {
      userCount: workspaceChannel.userCount + 1,
    });
  };

  leaveChannel = async (channelId: string) => {
    // TODO: When a user is removed from a channel, this is run
    //from the socket and removing the current user as well
    this.subscribedChannels = this.subscribedChannels.filter(
      (channel: Channel) => channel.uuid !== channelId,
    );

    this.updateChannel(channelId, { isSubscribed: false });

    const workspaceChannel = this.channels.find((el: Channel) => el.uuid === channelId);
    if (!workspaceChannel || !workspaceChannel.userCount) return;

    this.updateWorkspaceChannel(workspaceChannel.uuid, {
      userCount: workspaceChannel.userCount - 1,
    });
  };

  fetchSubscribedChannels = async () => {
    this.setIsLoading(true);
    const channels = await getSubscribedChannels();
    this.setSubscribedChannels([
      ...channels.map((channel: Channel) => ({
        ...channel,
        createdAt: dayjs(channel.createdAt),
        updatedAt: dayjs(channel.updatedAt),
      })),
    ]);
    this.setIsLoading(false);
  };

  fetchWorkspaceChannels = async (page: number, pageSize?: number) => {
    this.setIsLoading(true);
    const channels = await getWorkspaceChannels(page, pageSize);

    if (channels.length < 15) {
      this.setHasMore(false);
    } else {
      this.incrementPage();
    }

    this.addChannels([
      ...channels.map((channel: Channel) => ({
        ...channel,
        createdAt: dayjs(channel.createdAt),
        updatedAt: dayjs(channel.updatedAt),
      })),
    ]);

    this.setIsLoading(false);
  };
}
