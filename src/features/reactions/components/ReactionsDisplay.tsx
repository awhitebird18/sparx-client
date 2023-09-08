import { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Message } from '@/features/messages/types';
import { Reaction } from '@/features/reactions/types';
import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { EmojiSmile, Plus } from 'react-bootstrap-icons';
import EmojiPicker from './EmojiPicker';
import Emoji from '@/components/ui/Emoji';

type ReactionsDisplayProps = { message: Message };

const ReactionsDisplay = ({ message }: ReactionsDisplayProps) => {
  const { addReactionApi } = useStore('messageStore');
  const { currentUser, findUserByUuid } = useStore('userStore');
  const [showEmojiPicker, setShowEmojiPicker] = useState<{ top: number; left: number } | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emojiButtonRef = useRef<any>(null);

  const handleClickReaction = async (emojiId: string) => {
    if (!currentUser) return;
    await addReactionApi({
      emojiId,
      userId: currentUser.uuid,
      messageId: message.uuid,
    });
  };

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
      userId: message.userId,
      messageId: message.uuid,
    });
    handleCloseEmojiPicker();
  };

  if (!currentUser || !message.reactions?.length) return null;

  return (
    <div className="flex gap-1 max-w-xl flex-wrap my-3">
      {message.reactions.map((reaction: Reaction) => {
        const currentUserReacted = reaction.users?.includes(currentUser.uuid);
        return (
          <Tooltip key={reaction.uuid}>
            <TooltipTrigger asChild>
              <Button
                className={`h-fit rounded-2xl w-10 gap-0.5
                ${currentUserReacted && 'bg-primary hover:bg-primary-dark'}
                `}
                style={{ padding: '0.15rem 0.2rem' }}
                size="icon"
                variant="outline"
                onClick={() => handleClickReaction(reaction.emojiId)}
              >
                <Emoji id={reaction.emojiId} />
                <span
                  className={`text-primary text-xs ${
                    currentUserReacted ? 'text-white' : 'text-primary'
                  }`}
                >
                  {reaction.users.length}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="rounded-xl">
              <div className="items-center justify-center gap-2 flex flex-col w-52 p-2">
                <div className="border border-border rounded-xl p-2 bg-secondary">
                  <Emoji id={reaction.emojiId} size={32} />
                </div>

                <div className="text-center text-sm flex justify-center leading-6">
                  {reaction.users?.map((userId: string, index: number) => {
                    const user = findUserByUuid(userId);
                    if (!user) return;
                    return `${user.firstName} ${user.lastName}${
                      index >= reaction.users.length - 1 ? '' : ' and '
                    }`;
                  })}{' '}
                  reacted
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}

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
};

export default observer(ReactionsDisplay);
