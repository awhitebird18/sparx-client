import storage from '@/utils/storage';

export const navigateToLastPage = () => {
  const savedHistory = storage.getNavigationHistory();
  const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];

  if (parsedHistory.length) {
    return `/app/${parsedHistory[parsedHistory.length - 1].primaryView}`;
  }

  return '/app/home';
};
