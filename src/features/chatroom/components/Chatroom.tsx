/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { formatDate } from '../utils/datefns';
import { editorConfig } from '@/features/messageInput/configs/editorConfig';

import { useStore } from '@/stores/RootStore';

import { Badge } from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';
import Header from '@/components/layout/containers/Header';
import ChannelTitle from './ChannelTitle';
import AvatarGroup from './AvatarGroup';
import Message from '@/features/messages/components/Message';
import Content from '@/components/layout/containers/Content';
import ChannelIntroduction from './ChannelIntroduction';
import Thread from './Thread';
import Editor from '@/features/messageInput/Editor';
import UserInputNotSubscribed from './UserInputNotSubscribed';
import UsersTypingDisplay from '../../userTyping/components/UsersTypingDisplay';

import { Message as MessageType } from '@/features/messages/types';

// import { ChannelType } from '@/features/channels/enums';
// import channelApi from '@/features/channels/api';
// import { User } from '@/features/users/types';

const ChatRoom: React.FC = () => {
  const {
    isLoading,
    groupedMessagesWithUser,
    fetchMessagesApi,
    setPage,
    createMessageApi,
    hasMore,
  } = useStore('messageStore');
  const { setCurrentChannelUuid, currentChannelId, currentChannel, fetchChannelUserIdsApi } =
    useStore('channelStore');
  const { clearUsersTyping } = useStore('userTypingStore');
  const { emitSocket, joinRoom, leaveRoom } = useStore('socketStore');
  const { currentUser } = useStore('userStore');

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [thread, setThread] = useState<MessageType | null>(null);
  const { channelId } = useParams();

  const handleSubmit = async (messageContent: string) => {
    if (!currentChannel || !currentUser) return;

    // if (currentChannel.isTemp && currentChannel.type === ChannelType.DIRECT) {
    //   await channelApi.createDirectChannel(currentChannel.users.map((user: User) => user.uuid));
    // }

    await createMessageApi({
      content: messageContent,
      channelId: currentChannel.uuid,
      userId: currentUser.uuid,
      uuid: uuid(),
      createdAt: dayjs(),
    });
  };

  const handleInputChange = useCallback(() => {
    emitSocket('typing', {
      userId: currentUser?.uuid,
      username: currentUser?.firstName,
      channelId: currentChannelId,
    });
  }, [currentChannelId, currentUser?.firstName, currentUser?.uuid, emitSocket]);

  useLayoutEffect(() => {
    if (!channelId || channelId === currentChannelId) return;

    setPage(1);
    setCurrentChannelUuid(channelId);
    fetchMessagesApi(channelId);
  }, [fetchMessagesApi, channelId, setPage, setCurrentChannelUuid, currentChannelId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [groupedMessagesWithUser]);

  useEffect(() => {
    if (!currentChannelId) return;
    joinRoom(currentChannelId);
    fetchChannelUserIdsApi(currentChannelId);

    return () => {
      leaveRoom(currentChannelId);
      clearUsersTyping();
    };
  }, [clearUsersTyping, currentChannelId, fetchChannelUserIdsApi, joinRoom, leaveRoom]);

  return (
    <Content>
      <div className="flex overflow-hidden flex-1">
        <div className="flex flex-col w-full">
          <Header>
            <ChannelTitle />
            <AvatarGroup />
          </Header>
          <div className=" relative flex flex-1 bg-card dark:bg-background rounded-xl shadow-lg p-2 pb-5 overflow-hidden m-3">
            <div className="flex flex-col flex-1 overflow-hidden w-full">
              <div
                className="overflow-auto flex flex-col-reverse justify-start mb-2 flex-1 pr-2"
                ref={scrollRef}
              >
                <div ref={bottomRef} />
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    {groupedMessagesWithUser.map(({ date, messages }: any, index: number) => (
                      <div key={index}>
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
                            .filter((message: MessageType) => !message.parentId)
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
                      </div>
                    ))}

                    {!hasMore && <ChannelIntroduction channelId={channelId} />}
                  </>
                )}
              </div>
              {currentChannel?.isTemp ? (
                <UserInputNotSubscribed />
              ) : (
                <Editor
                  placeholder={`Message ${currentChannel?.name}`}
                  config={editorConfig}
                  onSubmit={handleSubmit}
                  onChange={handleInputChange}
                />
              )}
              <UsersTypingDisplay />
            </div>
          </div>
        </div>
        {thread && <Thread message={thread} setMessage={setThread} />}
      </div>
    </Content>
  );
};

export default observer(ChatRoom);
