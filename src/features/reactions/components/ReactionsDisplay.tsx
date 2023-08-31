// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { observer } from 'mobx-react-lite';
import { Message } from '@/features/messages/types';
import { Reaction } from '@/features/reactions/types';
import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/providers/auth';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
// import Username from '@/features/users/components/Username';

type ReactionsDisplayProps = { message: Message };

const ReactionsDisplay = ({ message }: ReactionsDisplayProps) => {
  const { addReactionApi } = useStore('messageStore');
  const { currentUser } = useAuth();

  const handleClickReaction = async (emojiId: string) => {
    await addReactionApi({
      emojiId,
      userId: message.userId,
      messageId: message.uuid,
    });
  };

  if (!message?.reactions?.length || !currentUser) return null;

  return (
    <div className="flex gap-1 max-w-xl flex-wrap">
      {message.reactions.map((reaction: Reaction) => {
        return (
          <Tooltip key={reaction.uuid}>
            <TooltipTrigger asChild>
              <Button
                // className={`h-fit rounded-2xl w-10 gap-0.5
                // ${reaction.users.includes(currentUser.uuid) && 'bg-userDark hover:bg-userDark'}
                // `}
                style={{ padding: '0.15rem 0.2rem' }}
                size="icon"
                variant="outline"
                onClick={() => handleClickReaction(reaction.emojiId)}
              >
                <em-emoji
                  id={reaction.emojiId}
                  set="apple"
                  style={{ fontSize: '1.2rem', lineHeight: '1rem' }}
                ></em-emoji>
                <span className="text-primary text-xs">{reaction.users.length}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="items-center justify-center gap-2 flex flex-col w-44 p-0">
                <div className="border border-border rounded-lg p-1">
                  <em-emoji id={reaction.emojiId} set="apple" style={{ fontSize: '4rem' }} />
                </div>

                <div className="text-center">
                  {/* {reaction.users.map((userId: string) => (
                    <Username key={userId} userId={userId} />
                  ))} */}
                  reacted
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default observer(ReactionsDisplay);
