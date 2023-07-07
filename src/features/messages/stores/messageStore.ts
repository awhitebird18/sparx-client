import { makeObservable, observable, action, computed } from 'mobx';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // import utc plugin
import timezone from 'dayjs/plugin/timezone'; // import timezone plugin
import { Message, UpdateMessage } from '@/features/messages';
import { messages, users } from '@/utils/seeds';
import { stores } from '@/stores/stores';
import { User } from '@/features/users';

dayjs.extend(utc);
dayjs.extend(timezone);

export class MessageStore {
  messages: Message[] = [];
  page = 1;
  pageSize = 10;

  constructor() {
    makeObservable(this, {
      messages: observable,
      page: observable,
      pageSize: observable,
      findById: action,
      addMessage: action,
      updateMessage: action,
      deleteMessage: action,
      fetchMessages: action,
      incrementPage: action,
      setMessages: action,
      groupedMessages: computed,
      groupedMessagesWithUser: computed,
    });
  }

  get groupedMessages() {
    return this.messages.reduce((groups: { [key: string]: Message[] }, message) => {
      const date = message.createdAt.format('MM-DD-YYYY');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  }

  get groupedMessagesWithUser() {
    console.log(this.groupedMessages);
    return Object.entries(this.groupedMessages).map(([date, messages]) => {
      return {
        date,
        messages: messages.map((message) => {
          const user = stores.userStore.users.find((user: User) => user.uuid === message.userId);

          const currentUser = {
            email: 'aaron@gmail.com',
            uuid: '3c82abba-2ce9-4805-a978-1bedf848dfe9',
            firstName: 'Aaron',
            lastName: 'Whitebird',
            image: '/images/profile-image-1.png',
            displayName: 'Aaron Whitebird',
          };

          return {
            ...message,
            user: user ? user : currentUser, // this will add the whole user object to each message
          };
        }),
      };
    });
  }

  findById = (uuid: string) => {
    return this.messages.find((message: Message) => message.uuid === uuid);
  };

  setMessages = (messages: Message[]) => {
    this.messages = messages;
  };

  addMessage = (message: Message) => {
    this.messages.push(message);
  };

  incrementPage = () => {
    this.page = this.page + 1;
  };

  updateMessage = (updatedMessage: UpdateMessage) => {
    const index = this.messages.findIndex(
      (message: Message) => message.uuid === updatedMessage.uuid,
    );
    if (index === -1) return null;

    this.messages[index] = { ...this.messages[index], ...updatedMessage };
  };

  deleteMessage = (uuid: string) => {
    this.messages = this.messages.filter((message: Message) => message.uuid !== uuid);
  };

  fetchMessages = (channelId: string) => {
    console.log(channelId);
    const messagesWithUsers = messages.map((message: Message) => {
      const user = users.find((user: User) => {
        user.uuid === message.userId;
      });

      message.user = user;

      return message;
    });

    this.setMessages(messagesWithUsers);
    this.incrementPage();
  };
}
