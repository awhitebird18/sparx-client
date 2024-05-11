import { useStore } from '@/stores/RootStore';
import useDebouncedEffect from './useDebouncedEffect';
import { useNodemapStore } from './useNodemapStore';
import { useTransformContext } from 'react-zoom-pan-pinch';

const useSyncNodemapSettings = () => {
  const { saveNodemapSettingsToLocalStorage, setInitialCoordinates, setScale } = useNodemapStore();
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { transformState } = useTransformContext();

  useDebouncedEffect(
    () => {
      if (!currentWorkspaceId) return;
      setInitialCoordinates({ x: transformState.positionX, y: transformState.positionY });
      setScale(transformState.scale);
      saveNodemapSettingsToLocalStorage();
    },
    [transformState.positionX, transformState.positionY, transformState.scale],
    500,
  );
};

export default useSyncNodemapSettings;
