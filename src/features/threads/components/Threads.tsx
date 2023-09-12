import ContentLayout from '@/components/layout/ContentLayout';
import Thread from '@/features/chatroom/components/Thread';
import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';
import { Thread as ThreadType } from '../types/thread';
import Message from '@/features/messages/components/Message';
import { Message as MessageType } from '@/features/messages/types';
import { observer } from 'mobx-react-lite';
import ChannelIcon from '@/features/channels/components/ChannelIcon';
import NoThreadsFallback from './NoThreadsFallback';

const Threads = () => {
  const { threads, fetchUserTheadsApi } = useStore('threadStore');
  const { thread, fetchThreadMessagesApi } = useStore('messageStore');
  const { findChannelByUuid } = useStore('channelStore');

  useEffect(() => {
    fetchUserTheadsApi();
  }, [fetchUserTheadsApi]);

  if (thread?.uuid !== 'derp') {
    throw Error('Error on threads page!');
  }

  return (
    <div className="flex h-full">
      <ContentLayout title="Threads" disablePadding>
        <div className="relative flex flex-1 bg-card dark:bg-background rounded-xl pb-5 overflow-auto h-full">
          <div className="flex flex-col flex-1 w-full h-fit space-y-6 my-6 mx-4">
            {threads.length ? (
              threads.map((t: ThreadType) => {
                const channel = findChannelByUuid(t.rootMessage.channelId);

                if (!channel) return;
                return (
                  <div
                    key={t.rootMessage.uuid}
                    onClick={() => {
                      fetchThreadMessagesApi(t.rootMessage);
                    }}
                    className="w-full h-min cursor-pointer rounded-lg"
                  >
                    <div className="mb-4 flex items-center gap-2 text-lg">
                      <ChannelIcon imageUrl={channel.icon} size={23} />
                      {channel.name}
                    </div>
                    <div className=" bg-background hover:bg-hover p-3 rounded-lg border border-border">
                      <div className="pointer-events-none">
                        {/* Parent message */}
                        <Message message={t.rootMessage} showUser />

                        {/* Show message count if greater than 2 */}
                        {t.replyCount > 2 ? (
                          <p className="text-userMedium my-2">{t.replyCount} replies</p>
                        ) : null}

                        {/* Latest replies */}
                        {t.latestReplies.map((r: MessageType) => {
                          return <Message key={r.uuid} message={r} showUser />;
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <NoThreadsFallback />
            )}
          </div>
        </div>
      </ContentLayout>
      {thread && <Thread />}
    </div>
  );
};

export default observer(Threads);
