import { setFavicon } from '@/utils/setFavicon';
import { makeObservable, observable, action, reaction, IReactionDisposer } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import notificationSound from '@/assets/audio/coin.mp3';

export enum NotificationType {
  ERROR = 'destructive',
  SUCCESS = 'success',
}

type Notification = {
  uuid?: string;
  title: string;
  description?: string;
  type: NotificationType;
  show: boolean;
};

export class NotificationStore {
  notifications: Notification[] = [];
  originalTitle = document.title;
  unreadsCount = 0;
  reactionDisposer: IReactionDisposer | null = null;
  audio = new Audio(notificationSound); // create audio object
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
    });

    this.reactionDisposer = reaction(
      () => this.unreadsCount,
      (count) => {
        if (count > 0) {
          document.title = `! ${this.originalTitle} - ${this.unreadsCount} new item${
            this.unreadsCount > 1 && 's'
          } - Sparx`;
          this.audio.play();
        } else {
          document.title = `${this.originalTitle} - Sparx`;
        }
      },
    );

    window.addEventListener('click', this.handleUserClick);
    this.audio.preload = 'auto'; // preload the audio file

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

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
    this.notifications = [...this.notifications, { ...notification, uuid: uuidv4(), show: true }];
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
