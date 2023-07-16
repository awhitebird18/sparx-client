import { Message } from '..';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import MessageDisplay from '@/features/messageInput/MessageDisplay';
import OptionsPanel from './OptionsPanel';
import { useState } from 'react';
import MessageEditor from '@/features/messageInput/MessageEditor';

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
      className={`message px-4 rounded-lg ${
        !disabled ? 'hover:bg-accent dark:hover:bg-accent' : ''
      } py-1.5 mr-2 relative`}
    >
      <div className="flex gap-2">
        {showUser ? (
          <Avatar className="h-10 w-10">
            <AvatarImage src="/" className="h-full w-full" />
            <AvatarFallback
              className="opacity-40 h-full w-full rounded-sm border"
              children={<img src="/images/default-avatar.png" />}
            />
          </Avatar>
        ) : (
          <div className="w-10" />
        )}

        <div className={`flex flex-col ${showUser ? 'h-10' : 'h-fit'} w-full`}>
          {showUser ? (
            <div className="flex gap-2 items-center h-5">
              <h2 className="font-semibold dark:text-gray-100 h-5 leading-4">Username</h2>
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
          {/* <p className="text-gray-600 dark:text-gray-300 h-5">{message.content}</p> */}
          {!showUser ? (
            <span className="timestamp absolute top-auto left-5 text-xs leading-6 text-muted-foreground w-12">
              {message.createdAt.format('h:mm')}
            </span>
          ) : null}
        </div>
        {!disabled ? <OptionsPanel message={message} setIsEditing={setIsEditing} /> : null}
      </div>
    </div>
  );
};

export default Message;
