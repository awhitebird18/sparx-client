import { useStore } from '@/stores/RootStore';
import { useRef, useState } from 'react';
import { Message } from '../types';

const useEmojiPicker = ({ message }: { message: Message }) => {
  const { currentUser } = useStore('userStore');
  const { addReactionApi } = useStore('messageStore');
  const ref = useRef<HTMLButtonElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<{ top: number; left: number } | null>(
    null,
  );

  const handleShowEmojiPicker = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setShowEmojiPicker({ top: rect.top - 435, left: rect.left - 315 });
    }
  };

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(null);
  };

  const handleAddReaction = async (emojiId: string) => {
    if (!currentUser) return;
    await addReactionApi({
      emojiId,
      messageId: message.uuid,
    });
    handleCloseEmojiPicker();
  };

  return { ref, showEmojiPicker, handleShowEmojiPicker, handleCloseEmojiPicker, handleAddReaction };
};

export default useEmojiPicker;
