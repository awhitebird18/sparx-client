/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/stores';
import { Badge } from '@/components/ui/Badge';
import Editor from './Editor';
import dayjs from 'dayjs';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

function formatDate(date: any) {
  const messageDate = dayjs(date);
  const todaysDate = dayjs();

  if (messageDate.isSame(todaysDate, 'day')) return 'Today';

  if (messageDate.add(1, 'day').isSame(todaysDate, 'day')) return 'Yesterday';

  return messageDate.format('MMM D YYYY');
}

const ChatRoom: React.FC = () => {
  const { groupedMessagesWithUser, fetchMessages } = useStore('messageStore');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [groupedMessagesWithUser]);

  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      setTimeout(() => {
        element.scrollTop = element.scrollHeight;
      }, 120);
    }
  }, [groupedMessagesWithUser]);

  console.log(groupedMessagesWithUser);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <h3 className="text-lg leading-6 font-medium">Chatroom</h3>
      <div className="flex-1 overflow-auto pr-4 mt-4" ref={scrollRef}>
        {/* <div ref={setLoadMoreRef} className="h-6 relative"></div> */}
        {groupedMessagesWithUser.map(({ date, messages }: any) => (
          <div key={date} className="relative">
            <div className="w-full flex relative">
              <Badge
                variant="outline"
                className="py-1.5 px-4 rounded-xl mx-auto w-fit bg-background z-10"
              >
                {formatDate(date)}
              </Badge>
              <div className="w-full bg-gray-800 h-px absolute top-[50%] left-0 opacity-50" />
            </div>

            {messages.map((message: any, index: number) => (
              <div
                key={message.id}
                className={`px-2 py-1 ${
                  index === 0 || (messages[index - 1].userId !== message.userId ? 'mt-2' : 'mt-1')
                } rounded-lg hover:bg-accent dark:hover:bg-accent`}
              >
                <div className="flex flex-col">
                  {index === 0 || messages[index - 1].userId !== message.userId ? (
                    <div className="flex gap-2">
                      <Avatar className="h-9 w-9 overflow-hidden rounded-sm">
                        <AvatarImage src={message.user?.image} className="rounded-sm" />
                        <AvatarFallback
                          children={<img src="/images/default-avatar.png" className="opacity-40" />}
                        />
                      </Avatar>
                      <div>
                        <h2 className="font-semibold dark:text-gray-100 leading-5">
                          {message.user.displayName}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-4">
                          {message.createdAt.format('h:mm a')}
                        </p>
                      </div>
                    </div>
                  ) : null}
                  <p className="text-gray-600 dark:text-gray-300 ml-11">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="py-4 rounded-xl shadow-md p-2">
        <Editor />
      </div>
    </div>
  );
};

export default observer(ChatRoom);
