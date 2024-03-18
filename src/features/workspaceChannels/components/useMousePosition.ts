// useMousePosition.js
import { useState, useCallback } from 'react';

const useMousePosition = (ref: any, zoomLevel: number) => {
  const [mouseDisplayPosition, setMouseDisplayPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event: any) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();

        // Get the scroll position, adjusted back to the original grid
        const adjustedScrollX = ref.current.scrollLeft / zoomLevel;
        const adjustedScrollY = ref.current.scrollTop / zoomLevel;

        // Mouse position relative to the container
        const mouseX = (event.clientX - rect.left) / zoomLevel;
        const mouseY = (event.clientY - rect.top) / zoomLevel;

        // Calculate the mouse position on the original grid
        const gridX = adjustedScrollX + mouseX;
        const gridY = adjustedScrollY + mouseY;

        setMouseDisplayPosition({ x: gridX, y: gridY });
      }
    },
    [ref, zoomLevel],
  );

  return { mouseDisplayPosition, handleMouseMove };
};

export default useMousePosition;
