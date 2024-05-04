import { useEffect, useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { editorConfig } from '@/features/messageInput/configs/editorConfig';
import { useStore } from '@/stores/RootStore';
import ChannelIntroduction from './ChannelIntroduction';
import Editor from '@/features/messageInput/Editor';
import UsersTypingDisplay from './UsersTypingDisplay';
import { Message as MessageType } from '@/features/messages/types';
import ContentLayout from '@/layout/contentContainer/ContentLayout';
import { MessageSkeleton } from './MessageSkeleton';
import useChannelSocket from '@/sockets/useChannelSocket';
import MessageGroup from './MessageGroup';
import useMessageHandler from '../hooks/useMessageHandler';
import useMessageSocket from '@/sockets/useMessageSocket';
import useChatroomSocket from '@/sockets/useChatroomSocket';
import useAutoScroll from '../hooks/useAutoScroll';

const ChatRoom: React.FC = observer(() => {
  const { isLoading, groupedMessagesWithUser, fetchMessagesApi, setPage } =
    useStore('messageStore');
  const { currentChannelId, currentChannel } = useStore('channelStore');
  const { updateUnreadCountApi, clearChannelUnreads } = useStore('channelUnreadStore');
  const { channelId } = useParams();
  const { handleTyping, sendMessage } = useMessageHandler();
  const { scrollRef, bottomRef } = useAutoScroll();
  useChannelSocket();
  useMessageSocket();
  useChatroomSocket();

  useLayoutEffect(() => {
    if (!currentChannelId) return;
    setPage(1);
    fetchMessagesApi(currentChannelId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  useEffect(() => {
    if (!currentChannelId) return;
    updateUnreadCountApi(currentChannelId);
    clearChannelUnreads(currentChannelId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannelId]);

  return (
    <div className="flex flex-col h-full overflow-hidden py-5">
      <div className="prose dark:prose-invert px-5 mb-3">
        <h3 className="mb-5">Discussions</h3>
      </div>
      <ContentLayout disablePadding>
        <div className="relative flex flex-col flex-1 overflow-hidden">
          <div
            className="overflow-auto flex flex-col-reverse justify-start mb-2 flex-1 pr-2"
            ref={scrollRef}
          >
            <div ref={bottomRef} className="bg-red-400" />

            {groupedMessagesWithUser.map(
              ({ date, messages }: { date: string; messages: MessageType[] }) => {
                return <MessageGroup key={date} date={date} messages={messages} />;
              },
            )}

            {!isLoading ? (
              <ChannelIntroduction />
            ) : (
              [1, 2, 3].map((key) => <MessageSkeleton key={key} />)
            )}
          </div>

          <Editor
            placeholder={`Message ${currentChannel?.name}`}
            config={editorConfig}
            onSubmit={sendMessage}
            onChange={handleTyping}
          />

          <UsersTypingDisplay />
        </div>
      </ContentLayout>
    </div>
  );
});

export default ChatRoom;
