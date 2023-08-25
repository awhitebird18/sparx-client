import { makeObservable, observable, action, computed } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { filterWorkspaceChannels } from '@/utils/filterUtils';
import { sortWorkspaceChannels } from '@/utils/sortUtils';

import channelApi from '@/features/channels/api';

import { Channel } from '../../channels/types';
import { SortOptions, SubscribeStatus, ChannelVisibility } from '../../channels/enums';
import { ChannelUserCount } from '../types/channelUserCount';

dayjs.extend(utc);
dayjs.extend(timezone);

export class WorkspaceChannelStore {
  workspaceChannels: Channel[] = [];
  channelUserCounts: ChannelUserCount[] = [];
  page = 1;
  pageSize = 10;
  isLoading = true;
  hasMore = true;
  filterSubscribed: SubscribeStatus | null = null;
  filterBySearchValue = '';
  filterChannelVisibility: ChannelVisibility | null = null;
  sortBy: SortOptions = SortOptions.ATOZ;

  constructor() {
    makeObservable(this, {
      workspaceChannels: observable,
      sortBy: observable,
      page: observable,
      pageSize: observable,
      hasMore: observable,
      filterBySearchValue: observable,
      filterChannelVisibility: observable,
      isLoading: observable,
      filteredAndSortedChannels: computed,
      setIsLoading: action,
      incrementPage: action,
      setSortBy: action,
      setFilterChannelVisibility: action,
      setFilterSubscribed: action,
      setFilterBySearchValue: action,
      filterSubscribed: observable,
      removeWorkspaceChannel: action,
      setWorkspaceChannels: action,
      fetchWorkspaceChannelsApi: action,
      findWorkspaceChannelByUuid: action,
      findChannelUserCountByChannelUuid: action,
    });
  }

  get filteredAndSortedChannels() {
    const filteredWorkspaceChannels = filterWorkspaceChannels(this.workspaceChannels, {
      filterSubscribed: this.filterSubscribed,
      filterBySearchValue: this.filterBySearchValue,
      filterChannelVisibility: this.filterChannelVisibility,
    });
    return sortWorkspaceChannels(filteredWorkspaceChannels, this.sortBy);
  }

  incrementPage = () => {
    this.page = this.page + 1;
  };

  setHasMore(bool: boolean) {
    this.hasMore = bool;
  }

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  setSortBy = (sortBy: SortOptions) => {
    this.sortBy = sortBy;
  };

  setFilterChannelVisibility = (channelType: ChannelVisibility | null) => {
    this.filterChannelVisibility = channelType;
  };

  setFilterSubscribed = (subscribedType: SubscribeStatus | null) => {
    this.filterSubscribed = subscribedType;
  };

  setFilterBySearchValue = (value: string) => {
    this.filterBySearchValue = value;
  };

  findWorkspaceChannelByUuid = (uuid: string) => {
    return this.workspaceChannels.find((el: Channel) => el.uuid === uuid);
  };

  setWorkspaceChannels = (channels: Channel[]) => {
    this.workspaceChannels = channels;
  };

  addWorkspaceChannel = (channel: Channel) => {
    const channelFound = this.workspaceChannels.find((el: Channel) => el.uuid === channel.uuid);
    if (!channelFound) return;
    this.workspaceChannels.push(channelFound);
  };

  addWorkspaceChannels = (channels: Channel[]) => {
    this.workspaceChannels.push(...channels);
  };

  updateWorkspaceChannel = async (channel: Channel) => {
    const index = this.workspaceChannels.findIndex((el: Channel) => el.uuid === channel.uuid);

    if (index === -1) return;

    this.workspaceChannels.splice(index, 1, channel);
  };

  removeWorkspaceChannel = (uuid: string) => {
    this.workspaceChannels = this.workspaceChannels.filter((el: Channel) => el.uuid !== uuid);
  };

  addChannelUserCounts = (channelUserCounts: ChannelUserCount[]) => {
    this.channelUserCounts.push(...channelUserCounts);
  };

  findChannelUserCountByChannelUuid = (channelUuid: string): number => {
    const channelUserCount = this.channelUserCounts.find(
      (el: ChannelUserCount) => el.channelUuid === channelUuid,
    );

    if (!channelUserCount) return 0;

    return channelUserCount.userCount;
  };

  fetchWorkspaceChannelsApi = async (page: number, pageSize?: number) => {
    this.setIsLoading(true);
    const res = await channelApi.getWorkspaceChannels(page, pageSize);
    const channels = [];
    const userCounts = [];

    for (let i = 0; i < res.length; i++) {
      channels.push(res[i].channel);
      userCounts.push({ channelUuid: res[i].channel.uuid, userCount: res[i].userCount });
    }

    if (channels.length < 15) {
      this.setHasMore(false);
    } else {
      this.incrementPage();
    }

    this.addWorkspaceChannels(channels);
    this.addChannelUserCounts(userCounts);

    this.setIsLoading(false);
  };
}
