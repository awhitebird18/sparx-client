import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';
import { useNodemapStore } from './useNodemapStore';
import { nodeDimensions } from '../utils/nodeDimensions';

const useCenterNodemap = () => {
  const { setInitialCoordinates, getNodemapSettings, setScale } = useNodemapStore();
  const { defaultChannel } = useStore('channelStore');

  useEffect(() => {
    if (!defaultChannel) return;
    const state = { scale: 1, x: 0, y: 0 };
    const nodemapState = getNodemapSettings();

    if (nodemapState) {
      state.scale = nodemapState.scale;
      state.x = nodemapState.x;
      state.y = nodemapState.y;

      setInitialCoordinates({
        x: nodemapState.x,
        y: nodemapState.y,
      });

      setScale(nodemapState.scale);
    } else {
      state.scale = 1;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const nodeWidth = nodeDimensions.width;
      const nodeHeight = nodeDimensions.height;

      const centerX = viewportWidth / 2 - (defaultChannel.x + nodeWidth / 2) * state.scale;
      const centerY = viewportHeight / 2 - (defaultChannel.y + nodeHeight / 2) * state.scale;

      setInitialCoordinates({
        x: centerX > 0 ? -centerX : centerX,
        y: centerY > 0 ? -centerY : centerY,
      });
    }
  }, [defaultChannel, getNodemapSettings, setInitialCoordinates, setScale]);

  return null;
};

export default useCenterNodemap;
