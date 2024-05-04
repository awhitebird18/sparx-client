import { useEffect, useRef } from 'react';
import { useNodemapStore } from './useNodemapStore';

const useSetupFullscreenHandler = () => {
  const { setRef } = useNodemapStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRef(ref); // Pass the ref object directly
    return () => setRef(null); // Cleanup to null out the ref when the component unmounts
  }, [setRef]);

  return ref;
};

export default useSetupFullscreenHandler;
