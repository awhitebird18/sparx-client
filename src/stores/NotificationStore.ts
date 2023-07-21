import { makeObservable, observable, action } from 'mobx';
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
  show: boolean; // <-- add this
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
    this.notifications = [...this.notifications, { ...notification, uuid: uuidv4(), show: true }];
  };

  dismissNotification = (uuid: string) => {
    this.notifications = this.notifications.map((notification) =>
      notification.uuid === uuid ? { ...notification, show: false } : notification,
    );
  };
}
