import { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Message } from '@/features/messages/types';
import { Reaction } from '@/features/reactions/types';
import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';
import { EmojiSmile, Plus } from 'react-bootstrap-icons';
import EmojiPicker from './EmojiPicker';
import EmojiBadge from './EmojiBadge';

type ReactionsDisplayProps = { message: Message };

const ReactionsDisplay = observer(({ message }: ReactionsDisplayProps) => {
  const { addReactionApi } = useStore('messageStore');
  const { currentUser } = useStore('userStore');
  const [showEmojiPicker, setShowEmojiPicker] = useState<{ top: number; left: number } | null>(
    null,
  );
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const handleShowEmojiPicker = () => {
    if (emojiButtonRef.current) {
      const rect = emojiButtonRef.current.getBoundingClientRect();
      setShowEmojiPicker({ top: rect.top - 440, left: rect.left });
    }
  };

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(null);
  };

  const handleAddReaction = async (emojiId: string) => {
    await addReactionApi({
      emojiId,
      messageId: message.uuid,
    });
    handleCloseEmojiPicker();
  };

  if (!currentUser || !message.reactions?.length) return null;

  return (
    <div className="flex gap-1 max-w-xl flex-wrap my-3">
      {/* Display reactions */}
      {message.reactions
        .slice()
        .sort((a: Reaction, b: Reaction) => a.emojiId.localeCompare(b.emojiId))
        .map((reaction: Reaction) => {
          const isCurrentUser = reaction.users?.includes(currentUser.uuid);
          return (
            <EmojiBadge
              isCurrentUser={isCurrentUser}
              messageId={message.uuid}
              reaction={reaction}
            />
          );
        })}

      {/* Add emoji button */}
      <div className="relative">
        <Button
          ref={emojiButtonRef}
          className={`h-full rounded-2xl w-10`}
          size="icon"
          variant="outline"
          onClick={handleShowEmojiPicker}
        >
          <EmojiSmile className="absolute top-1.5 right-4" />
          <Plus className="absolute top-0.5 right-1" />
        </Button>
        {showEmojiPicker && (
          <EmojiPicker
            position={showEmojiPicker}
            onEmojiClick={handleAddReaction}
            onClickAway={handleCloseEmojiPicker}
          />
        )}
      </div>
    </div>
  );
});

export default ReactionsDisplay;
