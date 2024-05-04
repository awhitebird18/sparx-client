import { makeAutoObservable } from 'mobx';
import usersApi from '../api';
import userProfileApi from '@/features/profile/api';
import { OnlineUser, UpdateUser, User } from '../types';
import { UserStatus } from '../enums';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import { Privileges } from '../enums/privileges';
import { ChannelSubscription } from '@/features/channels/types';

export class UserStore {
  users: User[] = [];
  isLoading = false;
  onlineUsers: OnlineUser[] = [];
  currentPage = 1;
  usersPerPage = 10;
  searchValue = '';
  completionFilter: CompletionStatus | null = null;
  privilegesFilter: Privileges = Privileges.ALL;
  hasMore = true;
  userOnlineStatus = UserStatus.ONLINE;
  currentUserId: string | undefined = undefined;
  channelUsers: ChannelSubscription[] = [];
  currentProfileUserId: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  // Computed values
  get currentUser() {
    return this.users.find((user) => user.uuid === this.currentUserId);
  }

  get filteredUsers() {
    return this.channelUsers.filter((userDetails: ChannelSubscription) => {
      // Get user
      const user = this.findUserByUuid(userDetails.userId);
      if (!user) return;
      // Completion
      const completionStatusMatch =
        !this.completionFilter || userDetails.status === this.completionFilter;
      // Search
      const name = `${user?.firstName} ${user.lastName}`;
      const searchMatch = name.toLowerCase().includes(this.searchValue.toLowerCase());
      // Privilges
      let privilegesMatch = true;
      if (this.privilegesFilter === Privileges.ADMIN && !user.isAdmin) {
        privilegesMatch = false;
      } else if (this.privilegesFilter === Privileges.MEMBER && user.isAdmin) {
        privilegesMatch = false;
      }
      return completionStatusMatch && privilegesMatch && searchMatch;
    });
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }

  // Setters
  setCurrentUserProfileId = (userId?: string) => {
    this.currentProfileUserId = userId;
  };

  setPrivilegesFilter = (value: Privileges) => {
    this.privilegesFilter = value;
  };

  setCompletionFilter = (value: CompletionStatus) => {
    this.completionFilter = value;
  };

  setSearchValue = (value: string) => {
    this.searchValue = value;
  };

  setCurrentUserId = (uuid: string | undefined) => {
    this.currentUserId = uuid;
  };

  setUserOnlineStatus = (userOnlineStatus: UserStatus) => {
    this.userOnlineStatus = userOnlineStatus;
  };

  setCurrentPage = (page: number) => {
    this.currentPage = page;
  };

  setUsers = (users: User[]) => {
    this.users = users;
  };

  setChannelUsers = (users: ChannelSubscription[]) => {
    this.channelUsers = users;
  };

  setOnlineUsers = (users: OnlineUser[]) => {
    this.onlineUsers = users;
  };

  setFilterToDefault = () => {
    this.setSearchValue('');
    this.setPrivilegesFilter(Privileges.ALL);
  };

  // Getters
  findUserByUuid = (userId?: string) => {
    return this.users.find((user: User) => user.uuid === userId);
  };

  findUserByName = (userName: string) => {
    return this.users.find(
      (user: User) => `${user.firstName} ${user.lastName}`.toLowerCase() === userName.toLowerCase(),
    );
  };

  findBot = () => {
    return this.users.find((user: User) => user.isBot);
  };

  // Update
  updateOnlineUser = (onlineUser: OnlineUser) => {
    const onlineUserFound = this.onlineUsers.find(
      (el: OnlineUser) => el.userId === onlineUser.userId,
    );
    if (!onlineUserFound) return;
    onlineUserFound.status = onlineUser.status;
  };

  updateUser = (updateUser: Partial<User>) => {
    const user = this.users.find((el: User) => el.uuid === updateUser.uuid);
    if (!user) return;
    Object.assign(user, updateUser);
  };

  // Create
  addUser = (user: User) => {
    if (this.findUserByUuid(user.uuid)) return;
    this.users.push(user);
  };

  // Remove
  removeUser = (uuid: string) => {
    this.users = this.users.filter((user) => user.uuid !== uuid);
  };

  // Api operations
  async updateUserApi(updatedUser: UpdateUser) {
    try {
      const user = await usersApi.updateUser(updatedUser);
      this.updateUser(user);
      return user;
    } catch (error) {
      console.error('Unable to update user:', error);
    }
  }

  async updateWorkspaceUserApi(userUuid: string, updatedUser: UpdateUser) {
    const user = await usersApi.updateWorkspaceUser(userUuid, updatedUser);
    this.updateUser(user);
    return user;
  }

  async uploadProfileImageApi(profileImage: string) {
    const user = await userProfileApi.uploadProfileImage(profileImage);
    this.updateUser(user);
    return user;
  }

  async fetchUsersApi() {
    this.setIsLoading(true);
    try {
      const users = await usersApi.getUsers();
      this.setUsers(users);
    } catch (error) {
      console.error('Unable to fetch users:', error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchChannelUserIdsApi(channelId: string) {
    this.setIsLoading(true);
    try {
      const userIds = await usersApi.getChannelUsers(channelId);
      this.setChannelUsers(userIds);
    } catch (error) {
      console.error('Unable to fetch userIds:', error);
    } finally {
      this.setIsLoading(false);
    }
  }

  // Ui operations
  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };
}
