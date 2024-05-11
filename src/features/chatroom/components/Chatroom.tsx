import { useEffect, useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { editorConfig } from '@/features/messageInput/configs/editorConfig';
import { useStore } from '@/stores/RootStore';
import ChannelIntroduction from './ChannelIntroduction';
import Editor from '@/features/messageInput/Editor';
import UsersTypingDisplay from './UsersTypingDisplay';
import { Message as MessageType } from '@/features/messages/types';
import { MessageSkeleton } from './MessageSkeleton';
import useChannelSocket from '@/sockets/useChannelSocket';
import MessageGroup from './MessageGroup';
import useMessageHandler from '../hooks/useMessageHandler';
import useMessageSocket from '@/sockets/useMessageSocket';
import useChatroomSocket from '@/sockets/useChatroomSocket';
import useAutoScroll from '../hooks/useAutoScroll';
import SidePanelContainer from '@/layout/sidePanel/SidePanelContainer';
import HeaderContainer from '@/layout/sidePanel/HeaderContainer';
import SidePanelBody from '@/layout/sidePanel/SidePanelBody';

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
    <SidePanelContainer>
      <HeaderContainer title="Discussions" />

      <SidePanelBody className="pb-6 px-0">
        <div
          className="overflow-y-auto flex flex-col-reverse justify-start mb-2 flex-1"
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
        <div className="px-5">
          <Editor
            placeholder={`Message ${currentChannel?.name}`}
            config={editorConfig}
            onSubmit={sendMessage}
            onChange={handleTyping}
          />
        </div>

        <UsersTypingDisplay />
      </SidePanelBody>
    </SidePanelContainer>
  );
});

export default ChatRoom;
