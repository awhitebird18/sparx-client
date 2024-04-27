import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

const useInitialDataLoader = () => {
  const { fetchChannelUserCounts, fetchUserChannelData } = useStore('channelStore');
  const { fetchNodemapSettingsApi, setIsLoading } = useStore('nodemapStore');
  const { getFlashcardsDueToday } = useStore('flashcardStore');
  const { currentWorkspaceId } = useStore('workspaceStore');

  useEffect(() => {
    if (!currentWorkspaceId) return;

    const loadData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          fetchChannelUserCounts(currentWorkspaceId),
          fetchUserChannelData(currentWorkspaceId),
          getFlashcardsDueToday(currentWorkspaceId),
        ]);
      } catch (error) {
        console.error('An error occurred fetching nodemap data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [
    currentWorkspaceId,
    setIsLoading,
    fetchChannelUserCounts,
    fetchUserChannelData,
    fetchNodemapSettingsApi,
    getFlashcardsDueToday,
  ]);
};

export default useInitialDataLoader;
