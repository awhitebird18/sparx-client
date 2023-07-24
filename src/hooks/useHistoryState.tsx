import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';

interface NavigationHistoryItem {
  timestamp: number;
  primaryView: string;
}

const useHistoryState = () => {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [navigationHistory, setNavigationHistory] = useLocalStorage<NavigationHistoryItem[] | any>(
    'navigationHistory',
    [],
  );

  useEffect(() => {
    const lastItem = navigationHistory[navigationHistory.length - 1];

    if (
      location.pathname.replace('/app/', '') !== lastItem?.primaryView &&
      location.pathname !== '/app'
    ) {
      setNavigationHistory((prev: NavigationHistoryItem[]) => [
        ...prev,
        { timestamp: new Date().getTime(), primaryView: location.pathname.replace('/app/', '') },
      ]);
    }
  }, [location, navigationHistory, setNavigationHistory]);

  return navigationHistory;
};

export default useHistoryState;
