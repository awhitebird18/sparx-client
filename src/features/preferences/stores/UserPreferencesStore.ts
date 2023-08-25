import { makeObservable, observable } from 'mobx';

import { NotificationType, PrimaryColors, Theme } from '../enums';
import { UserPreferences } from '../types';

export class UserPreferencesStore {
  userPreferences: UserPreferences;

  constructor() {
    this.userPreferences = {
      primaryColor: PrimaryColors.INDIGO,
      theme: Theme.LIGHT,
      notificationType: NotificationType.ALL,
    };
    makeObservable(this, {
      userPreferences: observable,
    });
  }

  setPrimaryColor = (color: PrimaryColors) => {
    this.userPreferences.primaryColor = color;
  };

  setTheme = (theme: Theme) => {
    this.userPreferences.theme = theme;
  };

  setNotificationType = (notificationType: NotificationType) => {
    this.userPreferences.notificationType = notificationType;
  };

  setInitialPreferences = ({
    theme,
    primaryColor,
    notificationType,
  }: {
    theme: Theme;
    primaryColor: PrimaryColors;
    notificationType: NotificationType;
  }) => {
    if (theme) this.setTheme(theme);
    if (primaryColor) this.setPrimaryColor(primaryColor);
    if (notificationType) this.setNotificationType(notificationType);
  };
}
