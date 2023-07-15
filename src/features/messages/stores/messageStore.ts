import { makeObservable, observable, action, computed } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { CreateMesssage, Message } from '@/features/messages';
import { getMessages } from '../api/getMessages';
import { createMessageApi } from '../api/createMessage';
import { editMessageApi } from '../api/editMessageApi';
import { deleteMessageApi } from '../api/deleteMessageApi';

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
      addMessages: action,
      updateMessage: action,
      deleteMessage: action,
      fetchMessages: action,
      incrementPage: action,
      setMessages: action,
      setPage: action,
      setIsLoading: action,
      groupedMessagesWithUser: computed,
    });
  }

  get groupedMessagesWithUser() {
    const groupedMessages = this.messages.reduce(
      (groups: { [key: string]: Message[] }, message) => {
        const date = message?.createdAt.format('MM-DD-YYYY');
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].unshift(message);
        return groups;
      },
      {},
    );

    return Object.entries(groupedMessages)
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
    this.messages.unshift(message);
  };

  createMessage = async (createMessage: CreateMesssage) => {
    try {
      const newMessage = await createMessageApi(createMessage);

      this.addMessage({
        ...newMessage,
        createdAt: dayjs(newMessage.createdAt),
      });
    } catch (err) {
      if (createMessage.uuid) {
        this.deleteMessage(createMessage.uuid);
      }
    }
  };

  editMessageContent = async (id: string, content: string) => {
    try {
      const updatedMessage = await editMessageApi(id, { content });

      this.updateMessage(updatedMessage.uuid, {
        ...updatedMessage,
        createdAt: dayjs(updatedMessage.createdAt),
      });
    } catch (err) {
      console.error(err);
    }
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  addMessages = (newMessages: Message[]) => {
    this.setMessages([...this.messages, ...newMessages]);
  };

  incrementPage = () => {
    this.page = this.page + 1;
  };

  updateMessage = (uuid: string, updatedMessage: CreateMesssage) => {
    const index = this.messages.findIndex((message: Message) => message.uuid === uuid);
    if (index === -1) return null;

    this.messages[index] = { ...this.messages[index], ...updatedMessage };
  };

  deleteMessage = async (uuid: string) => {
    this.messages = this.messages.filter((message: Message) => message.uuid !== uuid);

    await deleteMessageApi(uuid);
  };

  fetchMessages = async (channelId: string) => {
    this.setIsLoading(true);
    const messages = await getMessages(this.page, channelId);

    const formattedMessages = messages.map((message: Message) => ({
      ...message,
      createdAt: dayjs(message.createdAt),
    }));

    this.setMessages(formattedMessages);
    this.incrementPage();
    this.setIsLoading(false);
  };
}
