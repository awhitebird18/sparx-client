import { useStore } from '@/stores/RootStore';
import { useEffect, useRef } from 'react';

const useAutoScroll = () => {
  const { groupedMessagesWithUser } = useStore('messageStore');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [bottomRef, groupedMessagesWithUser]);

  return { scrollRef, bottomRef };
};

export default useAutoScroll;
