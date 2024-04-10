import { makeObservable, observable, action, reaction, IReactionDisposer } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import { setFavicon } from '@/utils/setFavicon';

export enum NotificationType {
  ERROR = 'destructive',
  SUCCESS = 'success',
}

type Notification = {
  uuid?: string;
  title: string;
  description?: string;
  type?: NotificationType;
  show?: boolean;
  requireAttention?: boolean;
};

export class NotificationStore {
  notifications: Notification[] = [];
  originalTitle = document.title;
  unreadsCount = 0;
  reactionDisposer: IReactionDisposer | null = null;
  audio: HTMLAudioElement | null = null;
  isWindowVisible = document.visibilityState === 'visible';

  constructor() {
    makeObservable(this, {
      notifications: observable,
      unreadsCount: observable,
      isWindowVisible: observable,
      addNotification: action,
      dismissNotification: action,
      setUnreadsCount: action,
      setTitle: action,
      sendBrowserNotification: action,
      handleUserClick: action,
      handleVisibilityChange: action,
    });

    if (document.readyState === 'complete') {
      this.loadNotificationSound(); // If the document is already complete when the store is instantiated
    } else {
      window.addEventListener('load', () => {
        this.loadNotificationSound(); // If the document is still loading when the store is instantiated
      });
    }

    this.reactionDisposer = reaction(
      () => this.unreadsCount,
      (count) => {
        if (count > 0) {
          document.title = `! ${this.originalTitle} - ${this.unreadsCount} new item${
            this.unreadsCount > 1 && 's'
          } - Sparx`;
          this.audio?.play();
        } else {
          document.title = `${this.originalTitle} - Sparx`;
        }
      },
    );

    window.addEventListener('click', this.handleUserClick);
    if (this.audio) {
      this.audio.preload = 'auto'; // preload the audio file
    }

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  loadNotificationSound = async () => {
    try {
      const { default: notificationSound } = await import('@/assets/audio/coin.mp3');
      this.audio = new Audio(notificationSound);
      this.audio.preload = 'auto'; // preload the audio file
    } catch (error) {
      console.error('Failed to load notification sound', error);
    }
  };

  sendBrowserNotification = async ({
    title,
    body,
    icon,
  }: {
    title: string;
    body?: string;
    icon?: string;
  }) => {
    // Ask the user for permission to show notifications.
    const permission = await Notification.requestPermission();

    // If the user granted permission, show a notification.
    if (permission === 'granted' && !this.isWindowVisible) {
      new Notification(title, { body, icon });
    }
  };

  addNotification = (notification: Notification) => {
    this.notifications = [
      ...this.notifications,
      {
        ...notification,
        uuid: uuidv4(),
        show: true,
        type: notification.type ?? NotificationType.SUCCESS,
      },
    ];
  };

  dismissNotification = (uuid: string) => {
    this.notifications = this.notifications.map((notification) =>
      notification.uuid === uuid ? { ...notification, show: false } : notification,
    );
  };

  setTitle = (title: string) => {
    this.originalTitle = `${title}`;
    document.title = `${title} - Sparx`;
  };

  // method to set unreadsCount
  setUnreadsCount = (count: number) => {
    this.unreadsCount = count;
  };

  handleUserClick = () => {
    this.setUnreadsCount(0);
    setFavicon();
  };

  handleVisibilityChange = () => {
    this.isWindowVisible = document.visibilityState === 'visible';
  };

  dispose = () => {
    this.reactionDisposer?.();
    window.removeEventListener('click', this.handleUserClick);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  };
}
