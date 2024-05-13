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

  console.log(isLoading);

  return (
    <SidePanelContainer className="py-5 pb-7 gap-2">
      <HeaderContainer className="mb-5" title="Discussions" />

      <SidePanelBody
        ref={scrollRef}
        className="overflow-y-auto flex flex-col-reverse justify-start flex-1 pr-5"
      >
        <div ref={bottomRef} />

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

        <UsersTypingDisplay />
      </SidePanelBody>

      <Editor
        placeholder={`Message ${currentChannel?.name}`}
        config={editorConfig}
        onSubmit={sendMessage}
        onChange={handleTyping}
        className="mx-7"
      />
    </SidePanelContainer>
  );
});

export default ChatRoom;
