/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { Badge } from '@/components/ui/Badge';
import { useParams } from 'react-router-dom';
import Spinner from '@/components/ui/Spinner';
import Header from '@/components/layout/containers/Header';
import ChannelTitle from './ChannelTitle';
import AvatarGroup from './AvatarGroup';
import Message from '@/features/messages/components/Message';
import Content from '@/components/layout/containers/Content';
import { formatDate } from '../utils/datefns';
import MessageInput from './MessageInput';
import ChannelIntroduction from './ChannelIntroduction';

const ChatRoom: React.FC = () => {
  const { isLoading, groupedMessagesWithUser, fetchMessages, setPage } = useStore('messageStore');
  const { setCurrentChannelId, currentChannelId } = useStore('channelStore');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { channelId } = useParams();

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
    <Content>
      <Header>
        <ChannelTitle />
        <AvatarGroup />
      </Header>
      {/* <Body> */}
      <div className="bg-card dark:bg-background rounded-xl shadow-md max-h-full p-2 overflow-hidden flex flex-col flex-1">
        <div
          className="overflow-auto flex flex-col-reverse justify-start mb-2 flex-1 pr-2"
          ref={scrollRef}
        >
          <div ref={bottomRef} />
          {isLoading ? (
            <Spinner />
          ) : (
            groupedMessagesWithUser.map(({ date, messages }: any) => (
              <div key={date} className="relative">
                <div className="w-full flex my-2 sticky top-2">
                  <Badge
                    variant="outline"
                    className="py-1.5 px-4 rounded-xl mx-auto w-fit bg-background z-10"
                  >
                    {formatDate(date)}
                  </Badge>
                  <div className="bg-border h-px absolute top-[50%] left-0 w-full opacity-50" />
                </div>

                {messages.map((message: any, index: number) => {
                  const displayUser = index === 0 || messages[index - 1].userId !== message.userId;

                  return <Message message={message} showUser={displayUser} />;
                })}
              </div>
            ))
          )}
          <ChannelIntroduction channelId={channelId} />
        </div>
        <MessageInput />
      </div>
      {/* </Body> */}
    </Content>
  );
};

export default observer(ChatRoom);
