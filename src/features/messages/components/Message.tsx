import { Message } from '..';
import MessageDisplay from '@/features/messageInput/MessageDisplay';
import OptionsPanel from './OptionsPanel';
import { useState } from 'react';
import MessageEditor from '@/features/messageInput/MessageEditor';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import ReactionsDisplay from '@/features/reactions/components/ReactionsDisplay';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { ChevronRight, Clock } from 'react-bootstrap-icons';
import OnlineStatusIndicator from '@/features/users/components/OnlineStatusIndicator';
import { UserStatus } from '@/features/users/types/enums';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const Message = ({
  message,
  showUser,
  disabled,
  setThread,
  isThread,
}: {
  message: Message;
  showUser: boolean;
  disabled?: boolean;
  setThread: (message: Message) => void;
  isThread?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { setActiveModal } = useStore('modalStore');

  const handleViewUserProfile = () => {
    setActiveModal({ type: 'ProfileModal', payload: { userId: message.userId } });
  };

  return (
    <div
      className={`message rounded-lg ${
        !disabled ? 'hover:bg-secondary dark:hover:bg-secondary/50' : ''
      } relative`}
    >
      <div className="flex gap-3 p-1.5 h-min">
        {showUser ? (
          <HoverCard>
            <HoverCardTrigger>
              <UserAvatar size={38} userId={message.userId} />
            </HoverCardTrigger>

            <HoverCardContent align="start" side="top" className="p-4 flex gap-4">
              <Button variant="ghost" onClick={handleViewUserProfile} className="w-fit h-fit p-0">
                <UserAvatar size={80} userId={message.userId} />
              </Button>

              <div className="flex gap-2 h-5 flex-col">
                <h2 className="font-semibold dark:text-gray-100 h-5 leading-4 flex gap-2 items-center">
                  <Username userId={message.userId} />{' '}
                  <OnlineStatusIndicator status={UserStatus.ONLINE} />
                </h2>
                <p className="text-xs text-muted-foreground mb-1 flex gap-2 items-center">
                  <Clock /> 5:35 PM Local time
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <div className="w-11" />
        )}

        <div className={`flex flex-col space-y-1 ${showUser ? 'h-fit' : 'h-fit'} w-full`}>
          {showUser ? (
            <div className="flex gap-2 items-center h-5">
              <h2 className="font-semibold dark:text-gray-100 h-5 leading-4">
                <Username userId={message.userId} />
              </h2>
              <p className="text-xs text-muted-foreground mb-1">
                {message.createdAt.format('h:mm a')}
              </p>
            </div>
          ) : null}

          {isEditing ? (
            <MessageEditor message={message} setIsEditing={setIsEditing} />
          ) : (
            <MessageDisplay content={message.content} id={message.uuid} />
          )}

          {!showUser ? (
            <span className="timestamp absolute top-auto left-5 text-xs leading-6 text-muted-foreground w-12">
              {message.createdAt.format('h:mm')}
            </span>
          ) : null}
          <ReactionsDisplay message={message} />
          {!isThread && message.childMessages?.length ? (
            <Button
              className="p-0 justify-between px-2 h-7 w-44 hover:border border-background"
              size="sm"
              variant="ghost"
            >
              <span className="text-blue-500">{`${message.childMessages.length} replies`}</span>
              <ChevronRight />
            </Button>
          ) : null}
        </div>
        {!disabled && !isEditing ? (
          <OptionsPanel message={message} setIsEditing={setIsEditing} setThread={setThread} />
        ) : null}
      </div>
    </div>
  );
};

export default observer(Message);
