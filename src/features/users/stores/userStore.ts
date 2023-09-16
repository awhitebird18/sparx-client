import { makeObservable, observable, action, computed } from 'mobx';

import usersApi from '../api';
import userProfileApi from '@/features/profile/api';

import { OnlineUser, UpdateUser, User } from '../types';
import { UserStatus } from '../enums';

export class UserStore {
  users: User[] = [];
  isLoading = false;
  onlineUsers: OnlineUser[] = [];
  currentPage = 1;
  usersPerPage = 10;
  searchValue = '';
  hasMore = true;
  userOnlineStatus = UserStatus.ONLINE;
  currentUserId: string | undefined = undefined;

  constructor() {
    makeObservable(
      this,
      {
        users: observable,
        onlineUsers: observable,
        currentUserId: observable,
        isLoading: observable,
        searchValue: observable,
        userOnlineStatus: observable,
        currentUser: computed,
        displayedUsers: computed,
        filteredUsers: computed,
        setCurrentPage: action,
        setCurrentUserId: action,
        setSearchValue: action,
        setIsLoading: action,
        setUsers: action,
        setOnlineUsers: action,
        totalPages: computed,
        findUserByUuid: action,
        findBot: action,
        addUser: action,
        updateUser: action,
        removeUser: action,
        updateUserApi: action,
        uploadProfileImageApi: action,
        fetchUsersApi: action,
        setUserOnlineStatus: action,
        findUserByName: action,
        updateOnlineUser: action,
      },
      { autoBind: true },
    );
  }

  get currentUser() {
    return this.users.find((user) => user.uuid === this.currentUserId);
  }

  get filteredUsers() {
    return this.users.filter(
      (user: User) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(this.searchValue.toLowerCase()) && user.uuid !== this?.currentUser?.uuid,
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }

  get displayedUsers() {
    return this.filteredUsers
      .filter((user: User) => user.uuid !== this.currentUser?.uuid)
      .slice((this.currentPage - 1) * this.usersPerPage, this.currentPage * this.usersPerPage);
  }

  findUserByUuid = (userId: string) => {
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

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  setCurrentPage = (page: number) => {
    this.currentPage = page;
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

  updateOnlineUser = (onlineUser: OnlineUser) => {
    const onlineUserFound = this.onlineUsers.find(
      (el: OnlineUser) => el.userId === onlineUser.userId,
    );

    if (!onlineUserFound) return;

    onlineUserFound.status = onlineUser.status;
  };

  setOnlineUsers = (users: OnlineUser[]) => {
    this.onlineUsers = users;
  };

  addUser = (user: User) => {
    if (this.findUserByUuid(user.uuid)) return;

    this.users.push(user);
  };

  setUsers = (users: User[]) => {
    this.users = users;
  };

  updateUser = (updateUser: User) => {
    const user = this.users.find((el: User) => el.uuid === updateUser.uuid);
    if (!user) return;

    Object.assign(user, updateUser);
  };

  removeUser = (uuid: string) => {
    this.users = this.users.filter((user) => user.uuid !== uuid);
  };

  updateUserApi = async (updatedUser: UpdateUser) => {
    const user = await usersApi.updateUser(updatedUser);

    this.updateUser(user);

    return user;
  };

  uploadProfileImageApi = async (profileImage: string) => {
    const user = await userProfileApi.uploadProfileImage(profileImage);

    this.updateUser(user);
    return user;
  };

  fetchUsersApi = async () => {
    this.setIsLoading(true);

    const users = await usersApi.getUsers();

    this.setUsers(users);

    this.setIsLoading(false);
  };
}
