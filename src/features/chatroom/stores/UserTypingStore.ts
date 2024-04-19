import { makeObservable, observable, action } from 'mobx';
import { UserTyping } from '../types';

export class UserTypingStore {
  usersTyping: UserTyping[] = [];

  constructor() {
    makeObservable(this, {
      usersTyping: observable,
      addUserTyping: action,
      clearUsersTyping: action,
      removeUserTyping: action,
    });
  }

  addUserTyping = (data: UserTyping) => {
    let userTypingIndex = this.usersTyping.findIndex(
      (userTyping: UserTyping) => userTyping.userId === data.userId,
    );

    if (userTypingIndex > -1 && this.usersTyping[userTypingIndex]?.timerId) {
      clearTimeout(this.usersTyping[userTypingIndex].timerId);
    } else {
      this.usersTyping.push(data);
      userTypingIndex = this.usersTyping.length - 1;
    }

    this.usersTyping[userTypingIndex].timerId = setTimeout(() => {
      this.removeUserTyping(data.userId);
    }, 3000);
  };

  clearUsersTyping = () => {
    this.usersTyping = [];
  };

  removeUserTyping = (userId: string) => {
    const userTypingIndex = this.usersTyping.findIndex(
      (userTyping: UserTyping) => userTyping.userId === userId,
    );

    if (userTypingIndex > -1) {
      this.usersTyping.splice(userTypingIndex, 1);
    }
  };
}
