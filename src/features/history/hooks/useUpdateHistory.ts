import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';
import { useHistoryStore } from './useHistoryStore';

const useUpdateHistory = () => {
  const { currentChannelId, setDefaultChannelAsCurrentChannelId, setCurrentChannelUuid } =
    useStore('channelStore');
  const { sidePanelComponent, setSidePanelComponent } = useStore('sidePanelStore');
  const { activeComponent, setMainPanel } = useStore('mainPanelStore');
  const { addNewHistoryItem, fetchHistory, lastHistoryItem } = useHistoryStore();

  // Fetches and sets initial data
  useEffect(() => {
    fetchHistory();

    if (!lastHistoryItem) {
      setDefaultChannelAsCurrentChannelId();
    } else {
      const { nodeId, sidePanel, mainPanel } = lastHistoryItem;

      setCurrentChannelUuid(nodeId);
      sidePanel && setSidePanelComponent({ type: sidePanel });
      mainPanel && setMainPanel({ type: mainPanel });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Updates mobx store and local storage on every change
  useEffect(() => {
    if (!currentChannelId) return;
    addNewHistoryItem({
      timestamp: new Date().getTime(),
      nodeId: currentChannelId,
      sidePanel: sidePanelComponent?.type,
      mainPanel: activeComponent?.type,
    });
  }, [activeComponent, addNewHistoryItem, currentChannelId, sidePanelComponent]);
};

export default useUpdateHistory;
