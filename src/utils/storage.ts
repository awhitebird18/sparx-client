import { PrimaryColors, Theme } from '@/features/preferences/enums';

const storage = {
  getAccessToken: () => {
    const token = window.localStorage.getItem('access_token');

    if (token) {
      return JSON.parse(token);
    }
  },
  getRefreshToken: () => {
    const token = window.localStorage.getItem('access_token');

    if (token) {
      return JSON.parse(token);
    }
  },

  getPrimaryColor: () => {
    const primaryColor = window.localStorage.getItem('primaryColor');

    if (primaryColor) {
      return JSON.parse(primaryColor);
    }
  },
  setPrimaryColor: (primaryColor: PrimaryColors) => {
    window.localStorage.setItem('primaryColor', JSON.stringify(primaryColor));
  },
  getTheme: () => {
    const theme = window.localStorage.getItem('theme');

    if (theme) {
      return JSON.parse(theme);
    } else {
      return 'dark';
    }
  },
  setTheme: (theme: Theme) => {
    window.localStorage.setItem('theme', JSON.stringify(theme));
  },
  getSidebarWidth: () => {
    return Number(JSON.parse(window.localStorage.getItem('sidebarWidth') as string));
  },
  setSidebarWidth: (width: number | string) => {
    window.localStorage.setItem('sidebarWidth', JSON.stringify(width));
  },
  getNavigationHistory: () => {
    return window.localStorage.getItem('navigationHistory');
  },
};

export default storage;
