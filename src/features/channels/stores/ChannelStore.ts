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
  currentChannelId: string | undefined;
  channelUserIds: string[] = [];
  isLoading = true;
  userChannelData: any[] = [];
  zoomLevel = 1.0;
  isEditing = false;
  isFullscreen = false;
  isDraggingNode = false;
  isControlPressed = false;

  constructor() {
    makeObservable(this, {
      subscribedChannels: observable,
      currentChannelId: observable,
      channelUserIds: observable,
      isLoading: observable,
      isControlPressed: observable,
      isFullscreen: observable,
      isEditing: observable,
      isDraggingNode: observable,
      zoomLevel: observable,
      userChannelData: observable,
      currentChannel: computed,
      getChannelByUuid: computed,
      defaultChannel: computed,
      findChannelByUuid: action,
      updateSubscribedChannel: action,
      addUserChannelData: action,
      setCurrentChannelUuid: action,
      setSubscribedChannels: action,
      removeSubscribedChannel: action,
      addSubscribedChannel: action,
      setIsLoading: action,
      setIsEditing: action,
      setIsFullscreen: action,
      setIsDraggingNode: action,
      createChannelApi: action,
      updateChannelApi: action,
      fetchSubscribedChannelsApi: action,
      joinChannelApi: action,
      joinDefaultChannelApi: action,
      leaveChannelApi: action,
      filterTempChannels: action,
      findTempChannel: action,
      inviteUsersToChannelApi: action,
      createDirectChannelApi: action,
      setZoomLevel: action,
      removeUserFromChannelApi: action,
      findUserChannelDataByChannelId: action,
    });
  }

  // Todo: computed value happens when the chatroom is entered. However, does not
  // occur when the join channel button is clicked.
  get currentChannel(): Channel | undefined {
    const channel = this.subscribedChannels.find(
      (channel) => channel.uuid === this.currentChannelId,
    );

    return channel;
  }

  get defaultChannel(): Channel | undefined {
    const channel = this.subscribedChannels.find((channel) => channel.isDefault);

    if (channel) {
      return channel;
    }
  }

  setZoomLevel = (value: number) => {
    this.zoomLevel = value;
  };

  setIsEditing = (bool: boolean) => {
    this.isEditing = bool;
  };
  setIsDraggingNode = (bool: boolean) => {
    this.isDraggingNode = bool;
  };

  setIsFullscreen = (bool: boolean) => {
    this.isFullscreen = bool;
  };
  setIsControlPressed = (bool: boolean) => {
    this.isControlPressed = bool;
  };

  get getChannelByUuid() {
    return (uuid: string) => {
      return this.subscribedChannels.find((channel) => channel.uuid === uuid);
    };
  }
  filterTempChannels = () => {
    this.subscribedChannels = this.subscribedChannels.filter((el: Channel) => !el.isTemp);
  };

  findChannelByUuid = (uuid: string) => {
    return this.subscribedChannels.find((channel: Channel) => channel.uuid === uuid);
  };

  findTempChannel = () => {
    return this.subscribedChannels.find((el: Channel) => el.isTemp);
  };

  setSubscribedChannels = (channels: Channel[]) => {
    this.subscribedChannels = channels.filter((channel) => channel.type !== 'direct');
  };

  setCurrentChannelUuid = (channelUuid: string | undefined) => {
    this.currentChannelId = channelUuid;
  };

  addSubscribedChannel = (channel: Channel) => {
    if (this.findChannelByUuid(channel.uuid)) return;

    this.subscribedChannels.push(channel);
  };

  updateSubscribedChannel = (updatedChannel: Partial<any>) => {
    const channelFound = this.subscribedChannels.find(
      (channel) => channel.uuid === updatedChannel.uuid,
    );

    if (!channelFound) return;

    Object.assign(channelFound, updatedChannel);
  };

  updateUserChannelData = (userChannel: any) => {
    const userChannelFound = this.userChannelData.find((el) => el.uuid === userChannel.uuid);

    if (!userChannelFound) return;

    Object.assign(userChannelFound, userChannel);
  };

  leaveChannel = (channelId: string) => {
    const channelFound = this.subscribedChannels.find((channel) => channel.uuid === channelId);

    if (!channelFound) return;

    channelFound.isSubscribed = false;
  };

  removeSubscribedChannel = (uuid: string) => {
    this.subscribedChannels = this.subscribedChannels.filter(
      (channel: Channel) => channel.uuid !== uuid,
    );
  };

  removeChannelApi = async (channelId: string, workspaceId: string) => {
    await channelApi.removeChannel(channelId, workspaceId);

    this.removeSubscribedChannel(channelId);
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  inviteUsersToChannelApi = async (channelUuid: string, users: User[]) => {
    const userIds = users.map((user: User) => user.uuid);
    await channelApi.inviteUsersToChannel(channelUuid, userIds);
  };

  createChannelApi = async (
    createChannel: CreateChannel,
    sectionId: string | undefined,
    currentWorkspaceId: string,
  ) => {
    const channel = await channelApi.createChannel(createChannel, sectionId, currentWorkspaceId);

    this.addSubscribedChannel(channel);
    return channel;
  };

  createDirectChannelApi = async (channelUserIds: string[], workspaceId: string) => {
    const channel = await channelApi.createDirectChannel(channelUserIds, workspaceId);

    this.addSubscribedChannel(channel);
    return channel;
  };

  joinChannelApi = async ({
    channelId,
    sectionId,
  }: {
    channelId: string;
    sectionId: string | undefined;
  }) => {
    const userChannel = await channelApi.joinChannel({ channelId, sectionId });

    const userChannelDataFound = this.findUserChannelDataByChannelId(userChannel.channel.uuid);

    if (userChannelDataFound) {
      this.updateUserChannelData(userChannel);
    } else {
      this.addUserChannelData(userChannel);
    }
  };

  joinDefaultChannelApi = async () => console.log('Review');

  // joinDefaultChannelApi = async ({ workspaceId }: { workspaceId: string }) => {
  // const userChannel = await channelApi.joinDefaultChannel({ workspaceId });
  // const userChannelDataFound = this.findUserChannelDataByChannelId(userChannel.channel.uuid);
  // if (userChannelDataFound) {
  //   this.updateUserChannelData(userChannel);
  // } else {
  //   this.addUserChannelData(userChannel);
  // }
  // };

  leaveChannelApi = async (channelUuid: string) => {
    const res = await channelApi.leaveChannel(channelUuid);

    if (res) {
      this.updateUserChannelData(res.subscriptionDetails);
    }
  };

  removeUserFromChannelApi = async (channelUuid: string, userUuid: string) => {
    await channelApi.removeUserFromChannel(channelUuid, userUuid);
  };

  updateChannelApi = async (uuid: string, updateChannel: UpdateChannel, workspaceId?: string) => {
    if (!workspaceId) return;
    const updatedChannel = await channelApi.updateChannel(uuid, updateChannel, workspaceId);
    this.updateSubscribedChannel(updatedChannel);
  };

  setChannelUserIds = (channelUserIds: string[]) => {
    this.channelUserIds = channelUserIds;
  };

  setUserChannelData = (userChannels: any[]) => {
    this.userChannelData = userChannels;
  };

  fetchUserChannelData = async (workspaceId: string) => {
    const userChannels = await channelApi.getUserChannels(workspaceId);

    this.setUserChannelData(userChannels);
  };

  findUserChannelDataByChannelId = (channelId: string) => {
    const channelData = this.userChannelData.find((el: any) => el.channel.uuid === channelId);

    return channelData;
  };

  addUserChannelData = (userData: any) => {
    this.userChannelData.push(userData);
  };

  // Gets workspace channels but is not used at the moment
  fetchSubscribedChannelsApi = async (workspaceId: string) => {
    this.setIsLoading(true);

    try {
      const channels = await channelApi.getSubscribedChannels(workspaceId);

      this.setSubscribedChannels([
        ...channels.map((channel: Channel) => ({
          ...channel,
          createdAt: dayjs(channel.createdAt),
          updatedAt: dayjs(channel.updatedAt),
        })),
      ]);
    } catch (error) {
      console.error(error);
    }
    this.setIsLoading(false);
  };

  moveNode = async (channelId: string, position: { x: number; y: number }) => {
    return await channelApi.updateNodePosition(channelId, position);
  };
}
