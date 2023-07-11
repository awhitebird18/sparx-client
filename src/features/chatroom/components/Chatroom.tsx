/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { Badge } from '@/components/ui/Badge';
import Editor from './Editor';
import dayjs from 'dayjs';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { useParams } from 'react-router-dom';
import Spinner from '@/components/ui/Spinner';

function formatDate(date: any) {
  const messageDate = dayjs(date);
  const todaysDate = dayjs();

  if (messageDate.isSame(todaysDate, 'day')) return 'Today';

  if (messageDate.add(1, 'day').isSame(todaysDate, 'day')) return 'Yesterday';

  return messageDate.format('MMM DD YYYY');
}

const ChatRoom: React.FC = () => {
  const { groupedMessagesWithUser, fetchMessages } = useStore('messageStore');
  const [isLoading, setIsLoading] = useState(true);
  const { currentChannel, fetchChannel } = useStore('channelStore');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { channelId } = useParams();

  useEffect(() => {
    console.log(channelId);
    setIsLoading(true);

    fetchMessages();

    // fetchChannel();

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [fetchMessages, fetchChannel, channelId]);

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

  if (isLoading || !currentChannel) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <h3 className="text-lg leading-6 font-medium">{currentChannel.name}</h3>
      <div className="flex-1 overflow-auto pr-4 mt-4" ref={scrollRef}>
        {groupedMessagesWithUser.map(({ date, messages }: any) => (
          <div key={date} className="relative">
            <div className="w-full flex relative my-2">
              <Badge
                variant="outline"
                className="py-1.5 px-4 rounded-xl mx-auto w-fit bg-background z-10"
              >
                {formatDate(date)}
              </Badge>
              <div className="w-full bg-gray-800 h-px absolute top-[50%] left-0 opacity-50" />
            </div>

            {messages.map((message: any, index: number) => {
              const displayUser = index === 0 || messages[index - 1].userId !== message.userId;

              return (
                <div
                  key={message.id}
                  className={`px-2 py-1 rounded-lg hover:bg-accent dark:hover:bg-accent ${
                    displayUser ? 'py-2' : ''
                  }`}
                >
                  <div className="flex gap-2">
                    {displayUser ? (
                      <div className="w-10">
                        <Avatar className="h-10 w-10 overflow-hidden rounded-sm">
                          <AvatarImage src={message.user?.image} className="rounded-sm h-10 w-10" />
                          <AvatarFallback
                            children={
                              <img
                                src="/images/default-avatar.png"
                                className="opacity-40 h-10 w-10"
                              />
                            }
                          />
                        </Avatar>
                      </div>
                    ) : (
                      <div className="w-10" />
                    )}

                    <div className="flex flex-col">
                      {displayUser && (
                        <div className="flex gap-2 items-center">
                          <h2 className="font-semibold dark:text-gray-100 h-5 leading-4">
                            {message.user.displayName}
                          </h2>
                          <p className="text-xs text-muted-foreground mb-1">
                            {message.createdAt.format('h:mm a')}
                          </p>
                        </div>
                      )}

                      <p className="text-gray-600 dark:text-gray-300">{message.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
