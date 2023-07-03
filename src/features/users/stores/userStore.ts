import { makeObservable, observable, action } from 'mobx';
import { User } from '@/features/users';
import { users } from '@/lib/seeds';

export class UserStore {
  users: User[] = users;

  constructor() {
    makeObservable(this, {
      users: observable,
      addUser: action,
      updateUser: action,
      deleteUser: action,
    });
  }

  addUser(user: User) {
    this.users.push(user);
  }

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
