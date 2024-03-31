// useScrollToMiddle.ts
import { useEffect } from 'react';

const useScrollToMiddle = (ref: any, width = 8000, height = 8000) => {
  useEffect(() => {
    if (ref.current) {
      const containerRect = ref.current.getBoundingClientRect();
      const scrollLeft = (width - containerRect.width) / 2;
      const scrollTop = (height - containerRect.height) / 2;

      ref.current.scrollTo({ left: scrollLeft, top: scrollTop });
    }
  }, [ref, width, height]);
};

export default useScrollToMiddle;
