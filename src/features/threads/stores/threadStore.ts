import { makeObservable, action, observable } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { Thread } from '../types/thread';

import { threadApi } from '../api';
import { Message } from '@/features/messages/types';

dayjs.extend(utc);
dayjs.extend(timezone);

export class ThreadStore {
  threads: Thread[] = [];
  currentThread?: Message = undefined;

  constructor() {
    makeObservable(this, {
      threads: observable,
      currentThread: observable,
      fetchUserTheadsApi: action,
      setThreads: action,
    });
  }

  setThreads(threads: Thread[]) {
    this.threads = threads;
  }

  fetchUserTheadsApi = async () => {
    const threads = await threadApi.getUserThreads();

    this.setThreads(threads);
  };
}
