import { setFavicon } from '@/utils/setFavicon';
import { makeObservable, observable, action, reaction, IReactionDisposer } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

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

  constructor() {
    makeObservable(this, {
      notifications: observable,
      unreadsCount: observable,
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
        } else {
          document.title = `${this.originalTitle} - Sparx`;
        }
      },
    );

    window.addEventListener('click', this.handleUserClick);
  }

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

  dispose = () => {
    this.reactionDisposer?.();
    window.removeEventListener('click', this.handleUserClick);
  };
}
