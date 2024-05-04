import { EmojiSmile, Pencil, Plus, Trash } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';
import EmojiPicker from '@/features/reactions/components/EmojiPicker';
import { Message } from '../types';
import { observer } from 'mobx-react-lite';
import useEmojiPicker from '../hooks/useEmojiPicker';
import useUserActions from '../hooks/useUserActions';

type OptionsPanelProps = {
  message: Message;
  setIsEditing: (messageId: string) => void;
};

const OptionsPanel = observer(({ message }: OptionsPanelProps) => {
  const { currentUser } = useStore('userStore');
  const { handleAddReaction, handleCloseEmojiPicker, handleShowEmojiPicker, ref, showEmojiPicker } =
    useEmojiPicker({ message });
  const { handleDeleteMessage, handleEditMessage } = useUserActions(message);

  const isCurrentUserMessage = message.userId === currentUser?.uuid;

  return (
    <div
      className={`options-panel flex absolute border border-border -top-5 right-2 rounded-lg bg-card shadow-md ${
        !showEmojiPicker && 'hidden'
      }`}
    >
      <div className="relative">
        <Button
          ref={ref}
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
      {isCurrentUserMessage && (
        <>
          <Button size="icon" variant="ghost" className="p-0 w-10 h-10" onClick={handleEditMessage}>
            <Pencil size={13} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="p-0 w-10 h-10 text-rose-500"
            onClick={handleDeleteMessage}
          >
            <Trash size={13} />
          </Button>
        </>
      )}
    </div>
  );
});

export default OptionsPanel;
