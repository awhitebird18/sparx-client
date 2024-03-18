import { useState, useCallback } from 'react';

export const useZoom = (ref: any, initialZoom = 1.0, maxZoom = 2.0, minZoom = 0.5) => {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const [transformOrigin, setTransformOrigin] = useState({ x: 4000, y: 4000 });

  const handleWheel = useCallback(
    (event: any) => {
      if (event.ctrlKey) {
        event.preventDefault();

        const scaleAmount = 0.02;
        const direction = event.deltaY < 0 ? 1 : -1;
        const newZoomLevel = Math.min(
          Math.max(zoomLevel + scaleAmount * direction, minZoom),
          maxZoom,
        );

        const containerRect = ref.current.getBoundingClientRect();
        const mouseX = event.clientX - containerRect.left;
        const mouseY = event.clientY - containerRect.top;

        // Calculate the point to keep under the mouse cursor after zoom
        const pointX = (mouseX + ref.current.scrollLeft) / zoomLevel;
        const pointY = (mouseY + ref.current.scrollTop) / zoomLevel;

        setTransformOrigin({ x: mouseX, y: mouseY });
        setZoomLevel(newZoomLevel);

        // Adjust the scroll position to keep the point under the mouse
        ref.current.scrollLeft = pointX * newZoomLevel - mouseX;
        ref.current.scrollTop = pointY * newZoomLevel - mouseY;
      }
    },
    [zoomLevel, maxZoom, minZoom, ref],
  );

  return { zoomLevel, handleWheel, transformOrigin };
};
