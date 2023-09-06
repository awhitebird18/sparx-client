import { PrimaryColors, Theme } from '@/features/preferences/enums';

const storage = {
  getAccessToken: () => {
    return JSON.parse(window.localStorage.getItem('access_token') as string);
  },
  getRefreshToken: () => {
    return JSON.parse(window.localStorage.getItem('access_token') as string);
  },

  getPrimaryColor: () => {
    return window.localStorage.getItem('primaryColor');
  },
  setPrimaryColor: (primaryColor: PrimaryColors) => {
    window.localStorage.setItem('primaryColor', JSON.stringify(primaryColor));
  },
  getTheme: () => {
    return window.localStorage.getItem('theme');
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
