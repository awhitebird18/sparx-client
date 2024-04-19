import { makeObservable, observable, action } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import channelApi from '@/features/channels/api';
import nodemapApi from '@/features/workspaceChannels/api';
import { Channel } from '../../channels/types';
import { SortOptions, SubscribeStatus, ChannelVisibility } from '../../channels/enums';
import { ChannelUserCount } from '../types/channelUserCount';
import { Line } from '../types/line';
import { NodemapSettings } from '../types/nodemapSettings';

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
  pointsToConnect: Line[] = [];
  nodemapSettings: Partial<NodemapSettings> = {
    userCountVisible: false,
    flashcardsDueVisible: false,
    unreadMessageCountVisible: false,
  };

  constructor() {
    makeObservable(this, {
      workspaceChannels: observable,
      pointsToConnect: observable,
      nodemapSettings: observable,
      sortBy: observable,
      page: observable,
      pageSize: observable,
      channelUserCounts: observable,
      hasMore: observable,
      filterBySearchValue: observable,
      filterChannelVisibility: observable,
      isLoading: observable,
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
      updateChannelUserCount: action,
      resetWorkspaceChannelStore: action,
      findChannelUserCount: action,
      setHasMore: action,
      addChannelUserCounts: action,
      setChannelUserCounts: action,
      updateWorkspaceChannel: action,
      setPage: action,
      addWorkspaceChannels: action,
      fetchNodemapSettingsApi: action,
    });
  }

  incrementPage = () => {
    this.page = this.page + 1;
  };

  setHasMore = (bool: boolean) => {
    this.hasMore = bool;
  };

  setPage = (page: number) => {
    this.page = page;
  };

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

  setChannelUserCounts = (channelUserCoutns: ChannelUserCount[]) => {
    this.channelUserCounts = channelUserCoutns;
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

  findChannelUserCount = (channelUuid: string) => {
    return this.channelUserCounts.find((el: ChannelUserCount) => el.channelUuid === channelUuid);
  };

  addChannelUserCounts = (channelUserCounts: ChannelUserCount[]) => {
    this.channelUserCounts.push(...channelUserCounts);
  };

  addChannelUserCount = (channelUserCounts: ChannelUserCount) => {
    this.channelUserCounts.push(channelUserCounts);
  };

  updateChannelUserCount = (channelUserCount: ChannelUserCount) => {
    const channelUserCountFound = this.findChannelUserCount(channelUserCount.channelUuid);

    if (!channelUserCountFound) {
      return this.addChannelUserCount(channelUserCount);
    }

    Object.assign(channelUserCountFound, channelUserCount);
  };

  findChannelUserCountByChannelUuid = (channelUuid: string): number => {
    const channelUserCount = this.channelUserCounts.find(
      (el: ChannelUserCount) => el.channelUuid === channelUuid,
    );

    if (!channelUserCount) return 0;

    return channelUserCount.userCount;
  };

  resetWorkspaceChannelStore = () => {
    this.setWorkspaceChannels([]);
    this.setHasMore(true);
    this.setChannelUserCounts([]);
    this.setFilterBySearchValue('');
    this.setFilterChannelVisibility(null);
    this.setFilterSubscribed(null);
    this.setPage(1);
    this.setSortBy(SortOptions.ATOZ);
    this.setIsLoading(true);
  };

  fetchWorkspaceChannelsApi = async (page: number, pageSize?: number) => {
    this.setIsLoading(true);
    const data = await channelApi.getWorkspaceChannels(page, pageSize);

    const { channels, channelUserCounts } = data;

    if (channels.length < 15) {
      this.setHasMore(false);
    } else {
      this.incrementPage();
    }

    this.addWorkspaceChannels(channels);
    this.addChannelUserCounts(channelUserCounts);

    this.setIsLoading(false);
  };

  fetchChannelUserCounts = async (workspaceId: string) => {
    const data = await channelApi.getChannelUserCounts(workspaceId);

    this.addChannelUserCounts(data);
  };

  setNodemapSettings = (nodemapSettings: NodemapSettings) => {
    this.nodemapSettings = nodemapSettings;
  };

  updateNodemapSettings = (nodemapSettings: NodemapSettings) => {
    Object.assign(this.nodemapSettings, nodemapSettings);
  };

  fetchNodemapSettingsApi = async (workspaceId: string) => {
    const nodemapSettings = await nodemapApi.getNodemapSettings(workspaceId);

    if (!nodemapSettings) {
      await nodemapApi.createNodemapSettings(workspaceId);
    }

    this.setNodemapSettings(nodemapSettings);
  };

  updateNodemapSettingsApi = async (uuid: string, updateFields: Partial<NodemapSettings>) => {
    const nodemapSettings = await nodemapApi.updateNodemapSettings(uuid, updateFields);

    this.updateNodemapSettings(nodemapSettings);
  };
}
