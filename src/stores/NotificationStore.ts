import { makeObservable, observable, action } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export enum NotificationType {
  ERROR = 'error',
  SUCCESS = 'success',
}

type Notification = {
  uuid?: string;
  title: string;
  content?: string;
  type: NotificationType;
};

export class NotificationStore {
  notifications: Notification[] = [];

  constructor() {
    makeObservable(this, {
      notifications: observable,
      addNotification: action,
      dismissNotification: action,
    });
  }

  addNotification = (notification: Notification) => {
    this.notifications = [...this.notifications, { ...notification, uuid: uuidv4() }];
  };

  dismissNotification = (uuid: string) => {
    this.notifications = this.notifications.filter((notification) => notification.uuid !== uuid);
  };
}
