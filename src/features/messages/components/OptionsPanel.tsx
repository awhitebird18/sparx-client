import { useState, useRef } from 'react';
import { ChatDots, EmojiSmile, Pencil, Plus, Trash } from 'react-bootstrap-icons';

import { useStore } from '@/stores/RootStore';

import { Button } from '@/components/ui/Button';
import { ModalName } from '@/components/modal/modalList';
import EmojiPicker from '@/features/reactions/components/EmojiPicker';

import { Message } from '../types';

type OptionsPanelProps = {
  message: Message;
  setIsEditing: (bool: boolean) => void;
  setThread?: (message: Message) => void;
  isThread?: boolean;
};

const OptionsPanel = ({ message, setIsEditing, isThread }: OptionsPanelProps) => {
  const { setActiveModal } = useStore('modalStore');
  const { currentUser } = useStore('userStore');
  const { fetchThreadMessagesApi, addReactionApi } = useStore('messageStore');
  const [showEmojiPicker, setShowEmojiPicker] = useState<{ top: number; left: number } | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emojiButtonRef = useRef<any>(null);

  const handleOpenModal = ({
    type,
    payload,
  }: {
    type: ModalName;
    payload: { message: Message };
  }) => {
    setActiveModal({ type, payload });
  };

  const handleEditMessage = () => {
    setIsEditing(true);
  };

  const handleShowEmojiPicker = () => {
    if (emojiButtonRef.current) {
      const rect = emojiButtonRef.current.getBoundingClientRect();

      setShowEmojiPicker({ top: rect.top - 435, left: rect.left - 315 });
    }
  };

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(null);
  };

  const handleReply = () => {
    fetchThreadMessagesApi(message);
  };

  const handleAddReaction = async (emojiId: string) => {
    await addReactionApi({
      emojiId,
      userId: message.userId,
      messageId: message.uuid,
    });
    handleCloseEmojiPicker();
  };

  return (
    <div className="options-panel hidden absolute -top-5 right-5 rounded-md bg-background shadow-sm shadow-black/70">
      <div className="relative">
        <Button
          ref={emojiButtonRef}
          size="icon"
          variant="ghost"
          className="p-0 w-10 h-10 relative"
          onClick={handleShowEmojiPicker}
        >
          <EmojiSmile />
          <Plus className="absolute top-0.5 right-0.5" />
        </Button>
        {showEmojiPicker && (
          <EmojiPicker
            position={showEmojiPicker}
            onEmojiClick={handleAddReaction}
            onClickAway={handleCloseEmojiPicker}
          />
        )}
      </div>
      {!isThread && (
        <Button size="icon" variant="ghost" className="p-0 w-10 h-10" onClick={handleReply}>
          <ChatDots />
        </Button>
      )}
      {message.userId === currentUser?.uuid && (
        <Button size="icon" variant="ghost" className="p-0 w-10 h-10" onClick={handleEditMessage}>
          <Pencil />
        </Button>
      )}
      <Button
        size="icon"
        variant="ghost"
        className="p-0 w-10 h-10 text-rose-500"
        onClick={() => handleOpenModal({ type: 'DeleteMessageModal', payload: { message } })}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default OptionsPanel;
