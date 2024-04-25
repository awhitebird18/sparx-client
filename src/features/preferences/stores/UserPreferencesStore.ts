import { action, makeObservable, observable, reaction } from 'mobx';

import { PrimaryColors, Theme } from '../enums';
import userPreferencesApi from '../api';
import { primaryColors } from '@/utils/primaryColors';
import storage from '@/utils/storage';

export class UserPreferencesStore {
  primaryColor: PrimaryColors | undefined;
  theme: Theme | undefined;

  constructor() {
    makeObservable(this, {
      primaryColor: observable,
      theme: observable,
      setPrimaryColor: action,
      setTheme: action,
      updateThemeApi: action,
      updatePrimaryColorApi: action,
      setInitialPreferences: action,
      resetPreferences: action,
    });

    reaction(
      () => this.theme,
      (newTheme) => {
        if (newTheme === 'dark') {
          document.body.classList.add(Theme.DARK);
          document.body.classList.remove(Theme.LIGHT);
        }

        if (newTheme === 'light') {
          document.body.classList.add(Theme.LIGHT);
          document.body.classList.remove(Theme.DARK);
        }
      },
    );

    reaction(
      () => this.primaryColor,
      (newPrimaryColor) => {
        if (!newPrimaryColor) return;

        for (let i = 0; i < primaryColors.length; i++) {
          document.body.classList.remove(primaryColors[i]);
        }

        document.body.classList.add(newPrimaryColor);
      },
    );
  }

  setPrimaryColor = (color: PrimaryColors) => {
    this.primaryColor = color;
  };

  setTheme = (theme: Theme) => {
    this.theme = theme;
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

  resetPreferences = () => {
    this.setTheme(Theme.DARK);
    this.setPrimaryColor(PrimaryColors.BLUE);
  };

  setInitialPreferences = ({
    theme,
    primaryColor,
  }: {
    theme: Theme;
    primaryColor: PrimaryColors;
  }) => {
    if (theme) {
      this.setTheme(theme);
      storage.setTheme(theme);
    }
    if (primaryColor) {
      this.setPrimaryColor(primaryColor);
      storage.setPrimaryColor(primaryColor);
    }
  };
}
