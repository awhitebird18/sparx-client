import { Message } from '..';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import DisplayEditor from '@/features/messageInput/DisplayEditor';

const Message = ({ message, showUser }: { message: Message; showUser: boolean }) => {
  return (
    <div
      key={message.uuid}
      className={
        'message px-4 rounded-lg hover:bg-accent dark:hover:bg-accent py-1.5 overflow-hidden mr-2'
      }
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

        <div className={`flex flex-col ${showUser ? 'h-10' : 'h-6'} w-full`}>
          {showUser ? (
            <div className="flex gap-2 items-center h-5">
              <h2 className="font-semibold dark:text-gray-100 h-5 leading-4">Username</h2>
              <p className="text-xs text-muted-foreground mb-1">
                {message.createdAt.format('h:mm a')}
              </p>
            </div>
          ) : null}

          <DisplayEditor content={message.content} />
          {/* <p className="text-gray-600 dark:text-gray-300 h-5">{message.content}</p> */}
          {!showUser ? (
            <span className="timestamp absolute top-auto left-5 text-xs leading-6 text-muted-foreground w-12">
              {message.createdAt.format('h:mm')}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Message;
