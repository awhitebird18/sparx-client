import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import Emoji from '@/components/ui/Emoji';
import { Reaction } from '../types';
import { Button } from '@/components/ui/Button';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';

type Props = { messageId: string; reaction: Reaction; isCurrentUser: boolean };

const EmojiBadge = observer(({ messageId, reaction, isCurrentUser }: Props) => {
  const { addReactionApi } = useStore('messageStore');
  const { findUserByUuid } = useStore('userStore');

  const handleClickReaction = async (emojiId: string) => {
    await addReactionApi({
      emojiId,
      messageId,
    });
  };

  return (
    <Tooltip key={reaction.emojiId}>
      <TooltipTrigger asChild>
        <Button
          className={`h-fit rounded-2xl w-10 gap-0.5
                ${isCurrentUser && 'bg-primary'}
                `}
          style={{ padding: '0.15rem 0.2rem' }}
          size="icon"
          variant={isCurrentUser ? 'default' : 'outline'}
          onClick={() => handleClickReaction(reaction.emojiId)}
        >
          <Emoji id={reaction.emojiId} />
          <span className={`text-primary text-xs ${isCurrentUser ? 'text-white' : 'text-primary'}`}>
            {reaction.users.length}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="rounded-xl">
        <div className="items-center justify-center gap-2 flex flex-col w-52 p-2">
          <div className="border border-border rounded-xl p-2 bg-card">
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
});

export default EmojiBadge;
