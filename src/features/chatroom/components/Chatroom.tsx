/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { Badge } from '@/components/ui/Badge';
import Editor from './Editor';
import dayjs from 'dayjs';

import { useParams } from 'react-router-dom';
import Spinner from '@/components/ui/Spinner';
import Header from '@/components/layout/containers/Header';
import ChannelTitle from './ChannelTitle';
import AvatarGroup from './AvatarGroup';
import Message from '@/features/messages/components/Message';
import Content from '@/components/layout/containers/Content';

function formatDate(date: any) {
  const messageDate = dayjs(date);
  const todaysDate = dayjs();

  if (messageDate.isSame(todaysDate, 'day')) return 'Today';

  if (messageDate.add(1, 'day').isSame(todaysDate, 'day')) return 'Yesterday';

  return messageDate.format('MMM DD YYYY');
}

const ChatRoom: React.FC = () => {
  const { isLoading, groupedMessagesWithUser, fetchMessages, setPage } = useStore('messageStore');
  const { setCurrentChannelId, currentChannelId } = useStore('channelStore');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { channelId } = useParams();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!channelId || channelId === currentChannelId) return;

    setPage(1);
    setCurrentChannelId(channelId);
    fetchMessages(channelId);
  }, [fetchMessages, channelId, setPage, setCurrentChannelId, currentChannelId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [groupedMessagesWithUser]);

  return (
    <div className="flex flex-col h-full overflow-hidden w-full">
      <Header>
        <ChannelTitle />
        <AvatarGroup />
      </Header>

      <Content>
        <div
          className="flex-1 overflow-auto mt-4 h-full flex flex-col-reverse justify-start"
          ref={scrollRef}
        >
          <div ref={bottomRef} />
          {isLoading ? (
            <Spinner />
          ) : (
            groupedMessagesWithUser.map(({ date, messages }: any) => (
              <div key={date} className="relative ">
                <div className="w-full flex my-2 sticky top-0">
                  <Badge
                    variant="outline"
                    className="py-1.5 px-4 rounded-xl mx-auto w-fit bg-background z-10"
                  >
                    {formatDate(date)}
                  </Badge>
                  <div className="bg-gray-800 h-px absolute top-[50%] left-0 opacity-50 w-full" />
                </div>

                {messages.map((message: any, index: number) => {
                  const displayUser = index === 0 || messages[index - 1].userId !== message.userId;

                  return <Message message={message} showUser={displayUser} />;
                })}
              </div>
            ))
          )}
        </div>

        <div className="py-4 rounded-xl shadow-md p-2">
          <Editor />
        </div>
      </Content>
    </div>
  );
};

export default observer(ChatRoom);
