import { makeAutoObservable, reaction } from 'mobx';
import { PrimaryColors, Theme } from '../enums';
import userPreferencesApi from '../api';
import { primaryColors } from '@/utils/primaryColors';
import storage from '@/utils/storage';
import { UserPreferences } from '../types';

export class UserPreferencesStore {
  primaryColor?: PrimaryColors;
  theme?: Theme;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });

    reaction(
      () => this.theme,
      (newTheme) => {
        if (newTheme === Theme.DARK) {
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
        for (let i = 0; i < primaryColors.length; i++) {
          document.body.classList.remove(primaryColors[i]);
        }

        document.body.classList.add(newPrimaryColor);
      },
    );
  }

  setPrimaryColor(color: PrimaryColors) {
    this.primaryColor = color;
  }

  setTheme(theme: Theme) {
    this.theme = theme;
  }

  createUserPreferences = async (userPreferences: Partial<UserPreferences>) => {
    const data = await userPreferencesApi.createUserPreferences(userPreferences);

    this.primaryColor = data.primaryColor;
    storage.setPrimaryColor(data.primaryColor);

    this.theme = data.theme;
    storage.setTheme(data.theme);
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
    this.setTheme(Theme.LIGHT);
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
    } else {
      this.setTheme(Theme.LIGHT);
    }
    if (primaryColor) {
      this.setPrimaryColor(primaryColor);
      storage.setPrimaryColor(primaryColor);
    } else {
      this.setPrimaryColor(PrimaryColors.PURPLE);
    }
  };
}
