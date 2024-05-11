import { RefObject, useEffect, useRef } from 'react';

const useIntersectionObserver = (
  ref: RefObject<Element>,
  onIntersect: () => void,
  options: IntersectionObserverInit = {},
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentElement = ref.current;

    if (currentElement) {
      // Create and assign a new observer instance directly to the ref
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      }, options);

      // Observe the current element
      observerRef.current.observe(currentElement);
    }

    return () => {
      // Ensure to disconnect the current observer to prevent memory leaks
      observerRef.current?.disconnect();
    };
  }, [ref, onIntersect, options]);
};

export default useIntersectionObserver;
