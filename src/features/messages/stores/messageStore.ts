import { makeObservable, observable, action, computed } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { v4 as uuid } from 'uuid';
import timezone from 'dayjs/plugin/timezone';

import messageApi from '@/features/messages/api';
import reactionsApi from '@/features/reactions/api';

import { CreateMesssage, Message, UpdateMessage } from '@/features/messages/types';
import { CreateReaction } from '@/features/reactions/types';

dayjs.extend(utc);
dayjs.extend(timezone);

export class MessageStore {
  messages: Message[] = [];
  page = 1;
  isLoading = true;
  hasMore = true;

  constructor() {
    makeObservable(this, {
      messages: observable,
      page: observable,
      hasMore: observable,
      findMessageByUuid: action,
      addMessage: action,
      addMessages: action,
      updateMessage: action,
      removeMessageApi: action,
      fetchMessagesApi: action,
      addReactionApi: action,
      incrementPage: action,
      formatAutomatedMessage: action,
      setMessages: action,
      setPage: action,
      setIsLoading: action,
      groupedMessagesWithUser: computed,
    });
  }

  get groupedMessagesWithUser() {
    const groupedMessages = this.messages.reduce(
      (groups: { [key: string]: Message[] }, message) => {
        const date = message.createdAt.format('MM-DD-YYYY');

        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].unshift(message);
        return groups;
      },
      {},
    );

    return Object.entries(groupedMessages).map(([date, messages]) => {
      return {
        date,
        messages,
      };
    });
  }

  incrementPage = () => {
    this.page = this.page + 1;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setHasMore = (val: boolean) => {
    this.hasMore = val;
  };

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  formatAutomatedMessage = ({
    userId,
    channelId,
    content,
  }: {
    userId: string;
    channelId: string;
    content: string;
  }) => {
    return {
      content: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${content}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
      userId,
      channelId,
      createdAt: dayjs(),
      timezone: 'toronto',
      uuid: uuid(),
      isSystem: true,
    };
  };

  setMessages = (messages: Message[]) => {
    this.messages = messages;
  };

  findMessageByUuid = (uuid: string) => {
    return this.messages.find((message: Message) => message.uuid === uuid);
  };

  addMessage = (message: Message) => {
    const messageFound = this.findMessageByUuid(message.uuid);
    if (messageFound) return;

    this.messages.unshift(message);
  };

  addMessages = (newMessages: Message[]) => {
    this.setMessages([...this.messages, ...newMessages]);
  };

  updateMessage = (updatedMessage: Message) => {
    const index = this.messages.findIndex((message) => message.uuid === updatedMessage.uuid);

    if (index === -1) return;

    this.messages.splice(index, 1, updatedMessage);
  };

  removeMessage = (uuid: string) => {
    this.messages = this.messages.filter((message: Message) => message.uuid !== uuid);
  };

  updateMessageApi = async (uuid: string, updatMessage: UpdateMessage) => {
    try {
      const updatedMessage = await messageApi.updateMessage(uuid, updatMessage);

      this.updateMessage(updatedMessage);
    } catch (err) {
      console.error(err);
    }
  };

  removeMessageApi = async (uuid: string) => {
    this.removeMessage(uuid);
    await messageApi.removeMessage(uuid);
  };

  addReactionApi = async (createReaction: CreateReaction) => {
    const updatedMessage = await reactionsApi.addReaction(createReaction);

    this.updateMessage(updatedMessage);
  };

  createMessageApi = async (createMessage: CreateMesssage, parentMessage?: Message) => {
    try {
      this.addMessage(createMessage as Message);

      const newMessage = await messageApi.createMessage({
        ...createMessage,
        ...(parentMessage && { parentId: parentMessage.uuid }),
      });
      newMessage.createdAt = dayjs(newMessage.createdAt);

      this.updateMessage(newMessage);
    } catch (err) {
      if (createMessage.uuid) {
        this.removeMessage(createMessage.uuid);
      }
    }
  };

  fetchMessagesApi = async (channelId: string) => {
    this.setIsLoading(true);
    const messages = await messageApi.getMessages(this.page, channelId);

    const formattedMessages = messages.map((message: Message) => ({
      ...message,
      createdAt: dayjs(message.createdAt),
    }));

    this.setHasMore(false);
    this.setMessages(formattedMessages);
    this.incrementPage();
    this.setIsLoading(false);
  };
}
