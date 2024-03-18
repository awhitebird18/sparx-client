// hooks/useZoom.ts
import { useState, useCallback } from 'react';

const useZoom = (initialZoomLevel: number) => {
  const [zoomLevel, setZoomLevel] = useState<number>(initialZoomLevel);

  const handleZoomChange = useCallback((newZoomLevel: number) => {
    // Additional logic if needed
    setZoomLevel(newZoomLevel);
  }, []);

  return { zoomLevel, handleZoomChange };
};

export default useZoom;
