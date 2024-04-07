import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '@/stores/RootStore';

interface NavigationHistoryItem {
  timestamp: number;
  primaryView: string;
  nodeId: string;
}

const useHistoryState = () => {
  const location = useLocation();
  const { currentChannelId, findChannelByUuid } = useStore('channelStore');
  const [version, setVersion] = useState(0);

  let timestamp: number;

  useEffect(() => {
    // Retrieve the current navigation history from localStorage
    const historyJson = localStorage.getItem('navigationHistory');
    const navigationHistory: NavigationHistoryItem[] = historyJson ? JSON.parse(historyJson) : [];

    const lastItem = navigationHistory[navigationHistory.length - 1];

    let primaryView = location.pathname.replace('/app/', '');

    if (primaryView === '/') {
      primaryView = 'home';
    }

    // Check if the current view is the same as the last one in the history
    // to prevent duplicate entries.

    console.log(
      currentChannelId,
      currentChannelId === lastItem?.nodeId,
      primaryView === lastItem?.primaryView,
    );
    if (
      !currentChannelId ||
      (currentChannelId === lastItem?.nodeId && primaryView === lastItem?.primaryView)
    ) {
      return;
    }
    timestamp = new Date().getTime();
    // Add the new navigation state to the history
    const newHistoryItem: NavigationHistoryItem = {
      timestamp: timestamp,
      primaryView,
      nodeId: currentChannelId,
    };
    console.log(findChannelByUuid(currentChannelId)?.name, timestamp);

    navigationHistory.push(newHistoryItem);

    // Save the updated navigation history back to localStorage
    localStorage.setItem('navigationHistory', JSON.stringify(navigationHistory));

    setVersion((prev) => prev + 1);
  }, [location, currentChannelId]);

  // Optionally, if you want to consume the navigation history in your component,
  // retrieve it here so it returns the latest history after updates.
  const getNavigationHistory = (): NavigationHistoryItem[] => {
    const historyJson = localStorage.getItem('navigationHistory');
    return historyJson ? JSON.parse(historyJson) : [];
  };

  console.log(getNavigationHistory());
  return getNavigationHistory();
};

export default useHistoryState;
