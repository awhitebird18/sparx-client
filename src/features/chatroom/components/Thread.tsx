import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { X } from 'react-bootstrap-icons';
import { Resizable, ResizeHandle } from 'react-resizable';
import dayjs from 'dayjs';
import { editorConfig } from '@/features/messageInput/configs/editorConfig';

import { useStore } from '@/stores/RootStore';

import { Button } from '@/components/ui/Button';
import Message from '@/features/messages/components/Message';
import Editor from '@/features/messageInput/Editor';
import { Message as MessageType } from '@/features/messages/types';
import ContentLayout from '@/components/layout/ContentLayout';

const Thread = () => {
  const [containerWidth, setContainerWidth] = useState(600);
  const {
    createMessageApi,
    threadMessages,
    thread: message,
    closeThread,
  } = useStore('messageStore');
  const { findUserByUuid, currentUser } = useStore('userStore');
  const { currentChannelId } = useStore('channelStore');

  if (!message) return;

  const onResize = (_event: unknown, { size }: { size: { width: number } }) => {
    // If the new size is smaller than some value, hide the sidebar
    if (size.width < 100) {
      setContainerWidth(0);
    } else {
      setContainerWidth(size.width);
    }
  };

  // The handle for resizing is on the right ('e')
  const resizeHandles: ResizeHandle[] = ['w'];

  const handleSubmit = async (messageContent: string) => {
    if (!currentUser) return;
    await createMessageApi(
      {
        content: messageContent,
        channelId: currentChannelId as string,
        userId: currentUser?.uuid,
        uuid: uuid(),
        createdAt: dayjs(),
        parentId: message.uuid,
      },
      message,
    );
  };

  const user = findUserByUuid(message.userId);

  return (
    <Resizable
      width={containerWidth}
      height={Infinity}
      onResize={onResize}
      resizeHandles={resizeHandles}
      minConstraints={[400, Infinity]}
      maxConstraints={[800, Infinity]}
    >
      <div
        className="flex flex-col border-l border-border bg-background"
        style={{
          width: `${containerWidth}px`,
        }}
      >
        <ContentLayout
          title="Thread"
          headerComponent={
            <Button
              variant="ghost"
              className="p-0 text-2xl"
              size="icon"
              onClick={() => closeThread()}
            >
              <X />
            </Button>
          }
        >
          <div className="bg-background rounded-xl pt-4 max-h-full flex flex-col">
            <div className="overflow-auto flex flex-col-reverse justify-start mb-2 flex-1">
              {threadMessages
                .map((message: MessageType, index: number) => {
                  const displayUser =
                    index === 0 || threadMessages[index - 1].userId !== message.userId;

                  return (
                    <Message key={message.uuid} message={message} showUser={displayUser} isThread />
                  );
                })
                .reverse()}

              <Message message={message} showUser={true} isThread />
            </div>
            <Editor
              placeholder={`Reply to ${user?.firstName} ${user?.lastName}`}
              config={editorConfig}
              onSubmit={handleSubmit}
            />
          </div>
        </ContentLayout>
      </div>
    </Resizable>
  );
};

export default observer(Thread);
