import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { X } from 'react-bootstrap-icons';
import { Resizable, ResizeHandle } from 'react-resizable';
import dayjs from 'dayjs';
import { editorConfig } from '@/features/messageInput/configs/editorConfig';

import { useStore } from '@/stores/RootStore';

import Header from '@/components/layout/containers/Header';
import { Button } from '@/components/ui/Button';
import Message from '@/features/messages/components/Message';
import Editor from '@/features/messageInput/Editor';
import { Message as MessageType } from '@/features/messages/types';

type ThreadProps = { message: MessageType; setMessage: (message: MessageType | null) => void };

const Thread = ({ message, setMessage }: ThreadProps) => {
  const [containerWidth, setContainerWidth] = useState(600);
  const { createMessageApi } = useStore('messageStore');
  const { findUserByUuid } = useStore('userStore');
  const { currentChannelId } = useStore('channelStore');
  const { currentUser } = useStore('userStore');

  const childMessages = message.childMessages;

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
      maxConstraints={[1200, Infinity]}
      transformScale={0.4}
    >
      <div
        className="flex flex-col border-l border-border overflow-hidden"
        style={{
          width: `${containerWidth}px`,
        }}
      >
        <Header>
          <p className="text-xl">Thread</p>
          <Button
            variant="ghost"
            className="p-0 text-2xl"
            size="icon"
            onClick={() => setMessage(null)}
          >
            <X />
          </Button>
        </Header>
        <div className="p-3 bg-card dark:bg-background rounded-xl shadow-lg max-h-full flex flex-col m-3 overflow-hidden">
          <div className="overflow-auto flex flex-col-reverse justify-start mb-2 flex-1 pr-2">
            {childMessages
              ?.slice()
              .sort((a: MessageType, b: MessageType) =>
                dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? -1 : 1,
              )
              .map((message: MessageType, index: number) => {
                const displayUser =
                  index === 0 || childMessages[index - 1].userId !== message.userId;

                return (
                  <Message
                    key={message.uuid}
                    message={message}
                    showUser={displayUser}
                    setThread={setMessage}
                    isThread
                  />
                );
              })
              .reverse()}
            <Message message={message} setThread={setMessage} showUser={true} isThread />
          </div>
          <Editor
            placeholder={`Reply to ${user?.firstName} ${user?.lastName}`}
            config={editorConfig}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </Resizable>
  );
};

observer;

export default observer(Thread);
