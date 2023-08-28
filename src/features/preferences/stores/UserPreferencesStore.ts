import { makeObservable, observable, reaction } from 'mobx';

import { NotificationType, PrimaryColors, Theme } from '../enums';
import { getValidPrimaryColor } from '@/utils/getValidPrimaryColor';
import { getValidTheme } from '@/utils/getValidTheme';

import userPreferencesApi from '../api';
import { primaryColors } from '@/utils/primaryColors';

export class UserPreferencesStore {
  primaryColor: PrimaryColors;
  notificationType: NotificationType;
  theme: Theme;

  constructor() {
    makeObservable(this, {
      primaryColor: observable,
      theme: observable,
      notificationType: observable,
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
        // Remove primary color class from body
        for (let i = 0; i < primaryColors.length; i++) {
          document.body.classList.remove(primaryColors[i]);
        }

        document.body.classList.add(newPrimaryColor);
      },
    );

    this.primaryColor = getValidPrimaryColor(window.localStorage.getItem('theme'));
    this.theme = getValidTheme(window.localStorage.getItem('theme'));
    this.notificationType = NotificationType.DIRECT;
  }

  setPrimaryColor = async (color: PrimaryColors) => {
    this.primaryColor = color;
  };

  setTheme = async (theme: Theme) => {
    this.theme = theme;
  };

  setNotificationType = (notificationType: NotificationType) => {
    this.notificationType = notificationType;
  };

  updatePrimaryColorApi = async (primaryColor: PrimaryColors) => {
    const userPreferences = await userPreferencesApi.updateUserPreferences({ primaryColor });

    this.primaryColor = userPreferences.primaryColor;
    window.localStorage.setItem('primaryColor', primaryColor);
  };

  updateThemeApi = async (theme: Theme) => {
    const userPreferences = await userPreferencesApi.updateUserPreferences({ theme });

    this.theme = userPreferences.theme;
    window.localStorage.setItem('theme', theme);
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
