import { makeObservable, observable, action, computed } from 'mobx';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // import utc plugin
import timezone from 'dayjs/plugin/timezone'; // import timezone plugin
import { Message, UpdateMessage } from '@/features/messages';
import { getMessages } from '../api/getMessages';

dayjs.extend(utc);
dayjs.extend(timezone);

export class MessageStore {
  messages: Message[] = [];
  page = 1;
  isLoading = true;

  constructor() {
    makeObservable(this, {
      messages: observable,
      page: observable,
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
      const date = message?.createdAt?.format('MM-DD-YYYY');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  }

  get groupedMessagesWithUser() {
    return Object.entries(this.groupedMessages)
      .map(([date, messages]) => {
        return {
          date,
          messages,
        };
      })
      .reverse();
  }

  findById = (uuid: string) => {
    return this.messages.find((message: Message) => message.uuid === uuid);
  };

  setMessages = (messages: Message[]) => {
    this.messages = messages;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  addMessage = (message: Message) => {
    this.messages.push(message);
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  addMessages = (newMessages: Message[]) => {
    this.messages = [...this.messages, ...newMessages];
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

  fetchMessages = async (channelId: string) => {
    this.setIsLoading(true);
    const messages = await getMessages(this.page, channelId);

    this.addMessages(messages);
    this.incrementPage();
    this.setIsLoading(false);
  };
}
