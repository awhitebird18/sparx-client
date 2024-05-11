import { observer } from 'mobx-react-lite';
import { Message } from '@/features/messages/types';
import { Reaction } from '@/features/reactions/types';
import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';
import { EmojiSmile, Plus } from 'react-bootstrap-icons';
import EmojiPicker from './EmojiPicker';
import EmojiBadge from './EmojiBadge';
import useEmojiPicker from '@/features/messages/hooks/useEmojiPicker';

type ReactionsDisplayProps = { message: Message };

const ReactionsDisplay = observer(({ message }: ReactionsDisplayProps) => {
  const { currentUser } = useStore('userStore');
  const { handleAddReaction, handleCloseEmojiPicker, handleShowEmojiPicker, ref, showEmojiPicker } =
    useEmojiPicker({ message });

  if (!currentUser || !message.reactions?.length) return null;

  return (
    <div className="flex gap-1 max-w-xl flex-wrap my-3">
      {/* Display reactions */}
      {message.reactions.map((reaction: Reaction) => {
        const isCurrentUser = reaction.users?.includes(currentUser.uuid);
        return (
          <EmojiBadge isCurrentUser={isCurrentUser} messageId={message.uuid} reaction={reaction} />
        );
      })}

      {/* Add emoji button */}
      <div className="relative">
        <Button
          ref={ref}
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
