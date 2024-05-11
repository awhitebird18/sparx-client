import React, { useEffect, useRef } from 'react';
import { debounce } from '../utils/debounce';

const useDebouncedEffect = (effect: () => void, deps: React.DependencyList, delay: number) => {
  const callback = useRef(effect);

  // Update the effect each render so it always gets the latest props/state
  useEffect(() => {
    callback.current = effect;
  });

  useEffect(() => {
    const handler = () => callback.current();

    const { debouncedFunction, cancel } = debounce(handler, delay);
    debouncedFunction();

    // Optional: Cleanup function to cancel the debounce on unmount or dependency change
    return cancel;
  }, [...deps, delay]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useDebouncedEffect;
