/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
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
import ChannelIntroduction from './ChannelIntroduction';
import Thread from './Thread';
import { Message as MessageDto } from '@/features/messages';
import Editor from '@/features/messageInput/Editor';
import { useAuth } from '@/providers/auth';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { editorConfig } from '@/features/messageInput/configs/editorConfig';

const ChatRoom: React.FC = () => {
  const { isLoading, groupedMessagesWithUser, fetchMessages, setPage, createMessage } =
    useStore('messageStore');
  const { setCurrentChannelId, currentChannelId, currentChannel } = useStore('channelStore');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [thread, setThread] = useState<MessageDto | null>(null);
  const { channelId } = useParams();
  const { currentUser } = useAuth();

  const handleSubmit = async (messageContent: string) => {
    await createMessage({
      content: messageContent,
      channelId: currentChannelId,
      userId: currentUser?.uuid,
      uuid: uuid(),
      createdAt: dayjs(),
      timezone: 'toronto',
    });
  };

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
      <div className="flex overflow-hidden flex-1">
        <div className="flex flex-col w-full">
          <Header>
            <ChannelTitle />
            <AvatarGroup />
          </Header>
          <div className="flex flex-1 bg-card dark:bg-background rounded-xl shadow-md p-3 overflow-hidden">
            <div className="flex flex-col flex-1 overflow-hidden w-full">
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

                      {messages
                        .filter(
                          (message: MessageDto) =>
                            !message.parentMessage || !message.parentMessageId,
                        )
                        .map((message: any, index: number) => {
                          const displayUser =
                            index === 0 || messages[index - 1].userId !== message.userId;

                          return (
                            <Message
                              key={message.uuid}
                              message={message}
                              showUser={displayUser}
                              setThread={setThread}
                            />
                          );
                        })}
                    </div>
                  ))
                )}
                <ChannelIntroduction channelId={channelId} />
              </div>
              <Editor
                placeholder={`Message ${currentChannel?.name}`}
                config={editorConfig}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
        {thread && <Thread message={thread} setMessage={setThread} />}
      </div>
    </Content>
  );
};

export default observer(ChatRoom);
