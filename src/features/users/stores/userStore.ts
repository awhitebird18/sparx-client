import { makeObservable, observable, action, computed } from 'mobx';

import usersApi from '../api';
import userProfileApi from '@/features/profile/api';

import { OnlineUser, UpdateUser, User } from '../types';
import { UserStatus } from '../enums';

export class UserStore {
  users: User[] = [];
  currentUser: User | undefined = undefined;
  isLoading = true;
  onlineUsers: OnlineUser[] = [];
  currentPage = 1;
  usersPerPage = 10;
  searchValue = '';
  hasMore = true;
  userOnlineStatus = UserStatus.ONLINE;

  constructor() {
    makeObservable(
      this,
      {
        users: observable,
        onlineUsers: observable,
        isLoading: observable,
        searchValue: observable,
        currentUser: observable,
        userOnlineStatus: observable,
        displayedUsers: computed,
        filteredUsers: computed,
        setCurrentPage: action,
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
      },
      { autoBind: true },
    );
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

  setCurrentUser = (user: User | undefined) => {
    this.currentUser = user;
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

  updateCurrentUser = (user: User) => {
    if (!this.currentUser) return;
    Object.assign(this.currentUser, user);
  };

  removeUser = (uuid: string) => {
    this.users = this.users.filter((user) => user.uuid !== uuid);
  };

  updateUserApi = async (updatedUser: UpdateUser) => {
    const user = await usersApi.updateUser(updatedUser);

    this.updateCurrentUser(user);
  };

  uploadProfileImageApi = async (profileImage: string) => {
    const user = await userProfileApi.uploadProfileImage(profileImage);

    this.updateCurrentUser(user);
  };

  fetchUsersApi = async () => {
    this.setIsLoading(true);

    const users = await usersApi.getUsers();

    this.setUsers(users);

    this.setIsLoading(false);
  };
}
