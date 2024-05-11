import { useEffect } from 'react';
import { init } from 'emoji-mart';

const useInitializeEmojis = () => {
  useEffect(() => {
    import('@emoji-mart/data/sets/14/apple.json')
      .then(({ default: data }) => {
        init({ data });
      })
      .catch((error) => {
        console.error('Failed to load emoji data', error);
      });
  }, []);
};

export default useInitializeEmojis;
