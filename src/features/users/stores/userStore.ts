import { makeObservable, observable, action } from 'mobx';
import { User } from '@/features/users';
import { getUsers } from '../api/getUsers';
import { uploadProfileImage } from '../api/uploadProfileImage';

export class UserStore {
  users: User[] = [];
  isLoading = true;
  onlineUsers: Map<string, Date> = new Map();

  constructor() {
    makeObservable(this, {
      users: observable,
      onlineUsers: observable,
      isLoading: observable,
      addUser: action,
      updateUser: action,
      deleteUser: action,
      setUsers: action,
      setIsLoading: action,
      fetchUsers: action,
      setOnlineUsers: action,
    });
  }

  setOnlineUsers = (users: Map<string, Date>) => {
    this.onlineUsers = new Map(users);
  };

  addUser = (user: User) => {
    this.users.push(user);
  };

  setUsers = (users: User[]) => {
    this.users = users;
  };

  findUser = (userId: string) => {
    return this.users.find((user: User) => user.uuid === userId);
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
    const userIndex = this.users.findIndex((user) => user.uuid === updatedUser.uuid);

    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], profileImage: updatedUser.profileImage };
    }
  };

  deleteUser = (uuid: string) => {
    this.users = this.users.filter((user) => user.uuid !== uuid);
  };
}
