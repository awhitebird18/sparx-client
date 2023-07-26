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
  show: boolean; // <-- add this
};

export class NotificationStore {
  notifications: Notification[] = [];
  originalTitle = document.title;
  newTitle = 'New Message!';
  intervalId: number | null = null;
  reactionDisposer: IReactionDisposer | null = null;

  constructor() {
    makeObservable(this, {
      notifications: observable,
      newTitle: observable, // <-- make newTitle observable
      addNotification: action,
      dismissNotification: action,
      startFlashingTitle: action,
      stopFlashingTitle: action,
      setNewTitle: action, // <-- add action to set newTitle
    });

    // setup the reaction
    this.reactionDisposer = reaction(
      () => this.newTitle,
      () => this.startFlashingTitle(),
    );
  }

  addNotification = (notification: Notification) => {
    this.notifications = [...this.notifications, { ...notification, uuid: uuidv4(), show: true }];
  };

  dismissNotification = (uuid: string) => {
    this.notifications = this.notifications.map((notification) =>
      notification.uuid === uuid ? { ...notification, show: false } : notification,
    );
  };

  // method to set newTitle
  setNewTitle = (title: string) => {
    this.newTitle = title;
  };

  startFlashingTitle = () => {
    if (this.intervalId) return;
    this.intervalId = window.setInterval(() => this.changeTitle(), 1000);
  };

  stopFlashingTitle = () => {
    if (!this.intervalId) return;
    window.clearInterval(this.intervalId);
    this.intervalId = null;
    document.title = this.originalTitle;
  };

  private changeTitle = () => {
    if (document.title === this.originalTitle) {
      document.title = this.newTitle;
    } else {
      document.title = this.originalTitle;
    }
  };

  dispose = () => {
    this.reactionDisposer?.();
  };
}
