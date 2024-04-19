/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { formatDate } from '../utils/datefns';
import { editorConfig } from '@/features/messageInput/configs/editorConfig';
import { useStore } from '@/stores/RootStore';
import { Badge } from '@/components/ui/Badge';
import ChannelTitle from './ChannelTitle';
import AvatarGroup from './AvatarGroup';
import Message from '@/features/messages/components/Message';
import ChannelIntroduction from './ChannelIntroduction';
import Editor from '@/features/messageInput/Editor';
import UsersTypingDisplay from './UsersTypingDisplay';
import { Message as MessageType } from '@/features/messages/types';
import { ChannelType } from '@/features/channels/enums';
import ContentLayout from '@/layout/contentContainer/ContentLayout';
import { MessageSkeleton } from './MessageSkeleton';

const ChatRoom: React.FC = observer(() => {
  const {
    isLoading,
    groupedMessagesWithUser,
    fetchMessagesApi,
    setPage,
    createMessageApi,
    setIsLoading,
    setMessages,
  } = useStore('messageStore');
  const { setCurrentChannelUuid, currentChannelId, currentChannel } = useStore('channelStore');
  const { fetchChannelUserIdsApi } = useStore('userStore');
  const { clearUsersTyping } = useStore('userTypingStore');
  const { emitSocket, joinRoom, leaveRoom } = useStore('socketStore');
  const { currentUser } = useStore('userStore');
  const { updateUnreadCountApi, clearChannelUnreads } = useStore('channelUnreadStore');

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { channelId } = useParams();

  const handleSubmit = async (messageContent: string) => {
    if (!currentChannel || !currentUser) return;

    await createMessageApi({
      content: messageContent,
      channelId: currentChannel.uuid,
      userId: currentUser.uuid,
      uuid: uuid(),
      createdAt: dayjs(),
    });

    emitSocket('stopped-typing', {
      userId: currentUser?.uuid,
      channelId: currentChannelId,
    });
  };

  const handleInputChange = useCallback(
    (_: string, text: string) => {
      if (!text) return;

      emitSocket('typing', {
        userId: currentUser?.uuid,
        username: currentUser?.firstName,
        channelId: currentChannelId,
      });
    },
    [currentChannelId, currentUser?.firstName, currentUser?.uuid, emitSocket],
  );

  useLayoutEffect(() => {
    if (!currentChannelId) return;

    setPage(1);
    fetchMessagesApi(currentChannelId);
  }, [fetchMessagesApi, channelId, setPage, setCurrentChannelUuid, currentChannelId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [groupedMessagesWithUser]);

  useEffect(() => {
    if (!currentChannelId) return;
    updateUnreadCountApi(currentChannelId);
    clearChannelUnreads(currentChannelId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannelId]);

  useEffect(() => {
    if (!currentChannelId) return;
    joinRoom(currentChannelId);
    fetchChannelUserIdsApi(currentChannelId);

    return () => {
      leaveRoom(currentChannelId);
      clearUsersTyping();
      setMessages([]);
    };
  }, [clearUsersTyping, currentChannelId, fetchChannelUserIdsApi, joinRoom, leaveRoom]);

  useEffect(() => {
    return () => setIsLoading(true);
  }, []);

  const headerComponent = currentChannel?.type === ChannelType.CHANNEL ? <AvatarGroup /> : null;

  return (
    <div className="flex h-full overflow-hidden">
      <ContentLayout title={<ChannelTitle />} headerComponent={headerComponent} disablePadding>
        <div className="relative flex flex-1 overflow-hidden">
          <div className="flex flex-col flex-1 overflow-hidden w-full">
            <div
              className="overflow-auto flex flex-col-reverse justify-start mb-2 flex-1 pr-2"
              ref={scrollRef}
            >
              <div ref={bottomRef} />

              <>
                {groupedMessagesWithUser.map(({ date, messages }: any, index: number) => (
                  <div key={index}>
                    <div key={date} className="relative">
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
                        .filter((message: MessageType) => !message.parentId)
                        .map((message: MessageType, index: number) => {
                          const displayUser =
                            index === 0 ||
                            messages[index - 1].userId !== message.userId ||
                            !!message.isSystem;

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
                  </div>
                ))}

                {!isLoading && <ChannelIntroduction channelId={currentChannelId} />}
              </>

              {isLoading && (
                <>
                  <MessageSkeleton />
                  <MessageSkeleton />
                  <MessageSkeleton />
                </>
              )}
            </div>

            <Editor
              placeholder={`Message ${currentChannel?.name}`}
              config={editorConfig}
              onSubmit={handleSubmit}
              onChange={handleInputChange}
            />

            <UsersTypingDisplay />
          </div>
        </div>
      </ContentLayout>
    </div>
  );
});

export default ChatRoom;
