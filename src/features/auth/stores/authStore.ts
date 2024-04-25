import { makeObservable, observable, action } from 'mobx';

interface User {
  id: string;
  username: string;
  token: string;
}

export class AuthStore {
  user: User | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      login: action,
      logout: action,
      isAuthenticated: action,
    });
  }

  login(user: User) {
    this.user = user;
  }

  logout() {
    this.user = null;
  }

  isAuthenticated() {
    return this.user !== null;
  }
}
