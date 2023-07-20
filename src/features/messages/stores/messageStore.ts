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

    return Object.entries(groupedMessages).map(([date, messages]) => {
      return {
        date,
        messages,
      };
    });
    // .reverse();
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

  createMessage = async (createMessage: CreateMesssage, parentMessage?: Message) => {
    try {
      const newMessage = await createMessageApi({
        ...createMessage,
        ...(parentMessage && { parentId: parentMessage.uuid }),
      });
      newMessage.createdAt = dayjs(newMessage.createdAt);

      if (parentMessage) {
        const childMessages = parentMessage.childMessages || [];

        this.updateMessage(parentMessage.uuid, {
          childMessages: [...childMessages, newMessage],
        });
      } else {
        this.addMessage(newMessage);
      }
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
    this.findAndUpdateMessage(this.messages, uuid, updatedMessage);
  };

  findAndUpdateMessage = (messages: Message[], uuid: string, updatedMessage: CreateMesssage) => {
    for (const message of messages) {
      if (message.uuid === uuid) {
        Object.assign(message, updatedMessage);
        return true; // Stop searching when we found and updated the message
      } else if (
        message.childMessages &&
        this.findAndUpdateMessage(message.childMessages, uuid, updatedMessage)
      ) {
        return true; // Stop searching further when we found and updated the message in childMessages
      }
    }
    return false; // Return false when we didn't find the message in the current list
  };

  deleteMessage = async (uuid: string) => {
    this.findAndDeleteMessage(this.messages, uuid);
    await deleteMessageApi(uuid);
  };

  findAndDeleteMessage = (messages: Message[] | undefined, uuid: string) => {
    if (!messages) return;

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].uuid === uuid) {
        // Remove the message from array
        messages.splice(i, 1);
        return true; // Stop searching when we found and deleted the message
      } else if (
        messages[i].childMessages &&
        this.findAndDeleteMessage(messages[i].childMessages, uuid)
      ) {
        return true; // Stop searching further when we found and deleted the message in childMessages
      }
    }
    return false; // Return false when we didn't find the message in the current list
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
