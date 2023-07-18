import { Message } from '..';
import MessageDisplay from '@/features/messageInput/MessageDisplay';
import OptionsPanel from './OptionsPanel';
import { useState } from 'react';
import MessageEditor from '@/features/messageInput/MessageEditor';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import ReactionsDisplay from '@/features/reactions/components/ReactionsDisplay';

const Message = ({
  message,
  showUser,
  disabled,
}: {
  message: Message;
  showUser: boolean;
  disabled?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div
      className={`message rounded-lg ${
        !disabled ? 'hover:bg-secondary dark:hover:bg-secondary/50' : ''
      } p-1.5 relative`}
    >
      <div className="flex gap-3">
        {showUser ? <UserAvatar size={39} userId={message.userId} /> : <div className="w-11" />}

        <div className={`flex flex-col gap-1 ${showUser ? 'h-fit' : 'h-fit'} w-full`}>
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
          <ReactionsDisplay messageId={message.uuid} />
        </div>
        {!disabled && !isEditing ? (
          <OptionsPanel message={message} setIsEditing={setIsEditing} />
        ) : null}
      </div>
    </div>
  );
};

export default Message;
