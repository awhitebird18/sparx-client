import { makeObservable, observable, action, computed } from 'mobx';
import { User } from '@/features/users';
import { getUsers } from '../api/getUsers';
import { uploadProfileImage } from '../api/uploadProfileImage';

export class UserStore {
  users: User[] = [];
  isLoading = true;
  onlineUsers: Map<string, Date> = new Map();
  currentPage = 1;
  usersPerPage = 10;
  searchValue = '';

  constructor() {
    makeObservable(this, {
      users: observable,
      onlineUsers: observable,
      isLoading: observable,
      addUser: action,
      updateUser: action,
      removeUser: action,
      setUsers: action,
      setIsLoading: action,
      fetchUsers: action,
      setOnlineUsers: action,
      findUser: action,
      findBot: action,
      handleUpdateUserSocket: action,
      handleNewUserSocket: action,
      setCurrentPage: action,
      handleRemoveserSocket: action,
      setSearchValue: action,
      uploadProfileImage: action,
      displayedUsers: computed,
      filteredUsers: computed,
      totalPages: computed,
    });
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.usersPerPage);
  }

  get filteredUsers() {
    return this.users.filter((user: User) =>
      user.firstName.toLowerCase().includes(this.searchValue.toLowerCase()),
    );
  }

  get displayedUsers() {
    return this.filteredUsers.slice(
      (this.currentPage - 1) * this.usersPerPage,
      this.currentPage * this.usersPerPage,
    );
  }

  setCurrentPage = (page: number) => {
    this.currentPage = page;
  };

  setSearchValue = (value: string) => {
    this.searchValue = value;
  };

  handleUpdateUserSocket = (user: User) => {
    this.updateUser(user.uuid, user);
  };

  handleNewUserSocket = (user: User) => {
    this.addUser(user);
  };

  handleRemoveserSocket = (userId: string) => {
    this.removeUser(userId);
  };

  setOnlineUsers = (users: Map<string, Date>) => {
    this.onlineUsers = new Map(users);
  };

  addUser = (user: User) => {
    if (this.findUser(user.uuid)) return;

    this.users.push(user);
  };

  setUsers = (users: User[]) => {
    this.users = users;
  };

  findUser = (userId: string) => {
    return this.users.find((user: User) => user.uuid === userId);
  };

  findBot = () => {
    return this.users.find((user: User) => user.isBot);
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  fetchUsers = async () => {
    this.setIsLoading(true);
    const users = await getUsers();

    this.setUsers(users);

    this.setIsLoading(false);
  };

  updateUser = (uuid: string, updatedFields: Partial<User>) => {
    const user = this.users.find((user) => user.uuid === uuid);

    if (user) {
      Object.assign(user, updatedFields);
    }
  };

  uploadProfileImage = async (userId: string, profileImage: string) => {
    const updatedUser = await uploadProfileImage(userId, profileImage);

    if (updatedUser) {
      this.updateUser(updatedUser.uuid, updatedUser);
    }
  };

  removeUser = (uuid: string) => {
    this.users = this.users.filter((user) => user.uuid !== uuid);
  };
}
