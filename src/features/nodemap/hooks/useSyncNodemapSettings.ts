import { useStore } from '@/stores/RootStore';
import { useTransformContext } from 'react-zoom-pan-pinch';
import useDebouncedEffect from './useDebouncedEffect'; // Ensure this is correctly imported
import useLocalStorage from '@/hooks/useLocalStorage'; // Assuming you have this custom hook
import { useEffect } from 'react';

const useSyncNodemapSettings = () => {
  const [nodemapSettings, setNodemapSettings] = useLocalStorage('nodemapSettings', {
    positionX: 4000,
    positionY: 4000,
    zoomLevel: 1,
  });
  const { updateNodemapSettingsApi, fetchNodemapSettingsApi } = useStore('nodemapStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { transformState } = useTransformContext();

  useEffect(() => {
    if (!currentWorkspaceId) return;

    // Initial fetch from the API
    fetchNodemapSettingsApi(currentWorkspaceId);
  }, [currentWorkspaceId, fetchNodemapSettingsApi]);

  // Using useDebouncedEffect to synchronize the nodemap settings
  useDebouncedEffect(
    () => {
      if (!currentWorkspaceId) return;
      // Update local storage and possibly an API with the latest transform state
      setNodemapSettings({
        positionX: transformState.positionX,
        positionY: transformState.positionY,
        zoomLevel: transformState.scale,
      });

      // Optionally update the API on each debounce trigger
      updateNodemapSettingsApi(currentWorkspaceId, {
        xPosition: transformState.positionX,
        yPosition: transformState.positionY,
        zoomLevel: transformState.scale,
      });
    },
    [transformState.positionX, transformState.positionY, transformState.scale, currentWorkspaceId],
    2000,
  );

  return nodemapSettings;
};

export default useSyncNodemapSettings;
