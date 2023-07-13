import { makeObservable, observable, action } from 'mobx';
import { User } from '@/features/users';
import { getUsers } from '../api/getUsers';

export class UserStore {
  users: User[] = [];
  isLoading = true;

  constructor() {
    makeObservable(this, {
      users: observable,
      isLoading: observable,
      addUser: action,
      updateUser: action,
      deleteUser: action,
    });
  }

  addUser(user: User) {
    this.users.push(user);
  }

  setUsers(users: User[]) {
    this.users = users;
  }

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  fetchUsers = async () => {
    this.setIsLoading(true);
    const users = await getUsers();

    console.log(users);

    this.setUsers(users);

    this.setIsLoading(false);
  };

  updateUser(uuid: string, updatedFields: Partial<User>) {
    const userIndex = this.users.findIndex((user) => user.uuid === uuid);

    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updatedFields };
    }
  }

  deleteUser(uuid: string) {
    this.users = this.users.filter((user) => user.uuid !== uuid);
  }
}
