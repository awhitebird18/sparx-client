import { useState, useRef } from 'react';
import { ChatDots, EmojiSmile, Pencil, Plus, Trash } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';
import { ModalName } from '@/layout/modal/modalList';
import EmojiPicker from '@/features/reactions/components/EmojiPicker';
import { Message } from '../types';
import { observer } from 'mobx-react-lite';

type OptionsPanelProps = {
  message: Message;
  setIsEditing: (bool: boolean) => void;
  setThread?: (message: Message) => void;
  isThread?: boolean;
};

const OptionsPanel = observer(({ message, setIsEditing, isThread }: OptionsPanelProps) => {
  const { setActiveModal } = useStore('modalStore');
  const { currentUser } = useStore('userStore');
  const { fetchThreadMessagesApi, addReactionApi } = useStore('messageStore');
  const [showEmojiPicker, setShowEmojiPicker] = useState<{ top: number; left: number } | null>(
    null,
  );
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

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
    if (!currentUser) return;
    await addReactionApi({
      emojiId,
      messageId: message.uuid,
    });
    handleCloseEmojiPicker();
  };

  return (
    <div
      className={`card options-panel flex absolute border border-border -top-5 right-5 rounded-xl bg-card shadow-md ${
        !showEmojiPicker && 'hidden'
      }`}
    >
      <div className="relative">
        <Button
          ref={emojiButtonRef}
          size="icon"
          variant="ghost"
          className="p-0 w-10 h-10 relative"
          onClick={handleShowEmojiPicker}
        >
          <EmojiSmile size={13} />
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
          <ChatDots size={13} />
        </Button>
      )}
      {message.userId === currentUser?.uuid && (
        <>
          <Button size="icon" variant="ghost" className="p-0 w-10 h-10" onClick={handleEditMessage}>
            <Pencil size={13} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="p-0 w-10 h-10 text-rose-500"
            onClick={() => handleOpenModal({ type: 'DeleteMessageModal', payload: { message } })}
          >
            <Trash size={13} />
          </Button>
        </>
      )}
    </div>
  );
});

export default OptionsPanel;
