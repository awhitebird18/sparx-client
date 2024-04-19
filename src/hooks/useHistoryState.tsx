import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '@/stores/RootStore';
import { NavigationHistoryItem } from './types/navigationHistoryItem';

const useHistoryState = () => {
  const location = useLocation();
  const { currentChannelId } = useStore('channelStore');

  let timestamp: number;

  useEffect(() => {
    const historyJson = localStorage.getItem('navigationHistory');
    const navigationHistory: NavigationHistoryItem[] = historyJson ? JSON.parse(historyJson) : [];

    const lastItem = navigationHistory[navigationHistory.length - 1];

    let primaryView = location.pathname.replace('/app/', '');

    if (primaryView === '/') {
      primaryView = 'home';
    }

    if (
      !currentChannelId ||
      (currentChannelId === lastItem?.nodeId && primaryView === lastItem?.primaryView)
    ) {
      return;
    }
    timestamp = new Date().getTime();

    const newHistoryItem: NavigationHistoryItem = {
      timestamp: timestamp,
      primaryView,
      nodeId: currentChannelId,
    };

    navigationHistory.push(newHistoryItem);

    localStorage.setItem('navigationHistory', JSON.stringify(navigationHistory));
  }, [location, currentChannelId]);

  const getNavigationHistory = (): NavigationHistoryItem[] => {
    const historyJson = localStorage.getItem('navigationHistory');
    return historyJson ? JSON.parse(historyJson) : [];
  };

  return getNavigationHistory();
};

export default useHistoryState;
