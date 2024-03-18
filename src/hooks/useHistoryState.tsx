import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
import { useStore } from '@/stores/RootStore';

interface NavigationHistoryItem {
  timestamp: number;
  primaryView: string;
  nodeId: string;
}

const useHistoryState = () => {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [navigationHistory, setNavigationHistory] = useLocalStorage<NavigationHistoryItem[] | any>(
    'navigationHistory',
    [],
  );
  const { currentChannelId } = useStore('channelStore');

  useEffect(() => {
    const lastItem = navigationHistory[navigationHistory.length - 1];

    if (!currentChannelId || currentChannelId === lastItem?.nodeId) return;

    setNavigationHistory((prev: NavigationHistoryItem[]) => [
      ...prev,
      {
        timestamp: new Date().getTime(),
        primaryView: location.pathname.replace('/app/', ''),
        nodeId: currentChannelId,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannelId]);

  return navigationHistory;
};

export default useHistoryState;
