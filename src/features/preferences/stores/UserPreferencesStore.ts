import { action, makeObservable, observable, reaction } from 'mobx';

import { NotificationType, PrimaryColors, Theme } from '../enums';
import { getValidPrimaryColor } from '@/utils/getValidPrimaryColor';
import { getValidTheme } from '@/utils/getValidTheme';

import userPreferencesApi from '../api';
import { primaryColors } from '@/utils/primaryColors';
import storage from '@/utils/storage';

export class UserPreferencesStore {
  primaryColor: PrimaryColors | undefined;
  notificationType: NotificationType | undefined;
  theme: Theme | undefined;

  constructor() {
    makeObservable(this, {
      primaryColor: observable,
      theme: observable,
      notificationType: observable,
      setPrimaryColor: action,
      setTheme: action,
      setNotificationType: action,
      updateThemeApi: action,
      updatePrimaryColorApi: action,
      updateNotificationTypeApi: action,
      setInitialPreferences: action,
    });

    reaction(
      () => this.theme,
      (newTheme) => {
        if (newTheme === 'dark') {
          document.body.classList.add(Theme.DARK);
          document.body.classList.remove(Theme.LIGHT);
        } else {
          document.body.classList.add(Theme.LIGHT);
          document.body.classList.remove(Theme.DARK);
        }
      },
    );

    reaction(
      () => this.primaryColor,
      (newPrimaryColor) => {
        if (!newPrimaryColor) return;
        // Remove primary color class from body
        for (let i = 0; i < primaryColors.length; i++) {
          document.body.classList.remove(primaryColors[i]);
        }

        document.body.classList.add(newPrimaryColor);
      },
    );

    this.setNotificationType(NotificationType.DIRECT);
    this.setPrimaryColor(getValidPrimaryColor(storage.getPrimaryColor()));
    this.setTheme(getValidTheme(storage.getTheme()));
  }

  setPrimaryColor = (color: PrimaryColors) => {
    this.primaryColor = color;
  };

  setTheme = (theme: Theme) => {
    this.theme = theme;
  };

  setNotificationType = (notificationType: NotificationType) => {
    this.notificationType = notificationType;
  };

  updatePrimaryColorApi = async (primaryColor: PrimaryColors) => {
    const userPreferences = await userPreferencesApi.updateUserPreferences({ primaryColor });

    this.primaryColor = userPreferences.primaryColor;
    storage.setPrimaryColor(userPreferences.primaryColor);
  };

  updateThemeApi = async (theme: Theme) => {
    const userPreferences = await userPreferencesApi.updateUserPreferences({ theme });

    this.theme = userPreferences.theme;
    storage.setTheme(userPreferences.theme);
  };

  updateNotificationTypeApi = (notificationType: NotificationType) => {
    this.notificationType = notificationType;
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
