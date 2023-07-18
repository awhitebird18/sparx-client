import { Button } from '@/components/ui/Button';
import { ChatDots, EmojiSmile, Pencil, Plus, Trash } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import { ModalName } from '@/components/modal/modalList';
import { Message } from '..';
import EmojiPicker from '@/features/reactions/components/EmojiPicker';
import { useState, useRef } from 'react';

type OptionsPanelProps = { message: Message; setIsEditing: (bool: boolean) => void };

const OptionsPanel = ({ message, setIsEditing }: OptionsPanelProps) => {
  const { setActiveModal } = useStore('modalStore');
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

  return (
    <div className="options-panel hidden border border-border absolute -top-5 right-5 rounded-md bg-card">
      <div className="relative">
        <Button
          ref={emojiButtonRef}
          size="icon"
          variant="ghost"
          className="p-0 w-9 h-9 relative"
          onClick={handleShowEmojiPicker}
        >
          <EmojiSmile />
          <Plus className="absolute top-0.5 right-0.5" />
        </Button>
        {showEmojiPicker && (
          <EmojiPicker
            messageId={message.uuid}
            onClickAway={handleCloseEmojiPicker}
            position={showEmojiPicker}
          />
        )}
      </div>
      <Button size="icon" variant="ghost" className="p-0 w-9 h-9">
        <ChatDots />
      </Button>
      <Button size="icon" variant="ghost" className="p-0 w-9 h-9" onClick={handleEditMessage}>
        <Pencil />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="p-0 w-9 h-9 text-rose-500"
        onClick={() => handleOpenModal({ type: 'DeleteMessageModal', payload: { message } })}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default OptionsPanel;
