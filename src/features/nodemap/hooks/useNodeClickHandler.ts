import { useStore } from '@/stores/RootStore';
import { RefObject, useEffect } from 'react';

type Props = {
  ref: RefObject<HTMLDivElement>;
};

const useClickNodeHandler = ({ ref }: Props) => {
  const { setFocusedNodeId } = useStore('channelStore');

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;

      if (clickedElement.dataset.nodeId) {
        setFocusedNodeId(clickedElement.dataset.nodeId);
      } else if (clickedElement.classList.contains('nodemap')) {
        setFocusedNodeId(null);
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('click', clickHandler);
      return () => element.removeEventListener('click', clickHandler);
    }
  }, [ref, setFocusedNodeId]);
};

export default useClickNodeHandler;
