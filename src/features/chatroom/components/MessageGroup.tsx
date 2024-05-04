import React from 'react';
import { Message as MessageType } from '@/features/messages/types';
import Message from '@/features/messages/components/Message';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '../utils/datefns';

interface MessageGroupProps {
  date: string;
  messages: MessageType[];
}

const MessageGroup: React.FC<MessageGroupProps> = ({ date, messages }) => (
  <div className="relative">
    <div className="w-full flex my-2 sticky top-2">
      <Badge
        variant="outline"
        className="py-1.5 px-4 rounded-xl mx-auto w-fit !bg-background border !border-border z-20"
      >
        {formatDate(date)}
      </Badge>
      <div className="bg-border h-px absolute top-[50%] left-0 w-full" />
    </div>

    {messages
      .filter((message) => !message.parentId)
      .map((message, index) => {
        const displayUser =
          index === 0 || messages[index - 1].userId !== message.userId || !!message.isSystem;

        return (
          <Message
            key={message.uuid}
            message={message}
            showUser={displayUser}
            disabled={message.isSystem}
          />
        );
      })}
  </div>
);

export default MessageGroup;
