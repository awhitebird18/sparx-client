import Header from '@/components/layout/containers/Header';
import { Message as MessageDto } from '@/features/messages';
import Message from '@/features/messages/components/Message';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { X } from 'react-bootstrap-icons';
import { Resizable, ResizeHandle } from 'react-resizable';
import Editor from '@/features/messageInput/Editor';
import { useAuth } from '@/providers/auth';
import { useStore } from '@/stores/RootStore';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { editorConfig } from '@/features/messageInput/configs/editorConfig';
import { observer } from 'mobx-react-lite';

type ThreadProps = { message: MessageDto; setMessage: (message: MessageDto | null) => void };

const Thread = ({ message, setMessage }: ThreadProps) => {
  const [containerWidth, setContainerWidth] = useState(600);
  const { createMessage } = useStore('messageStore');
  const { findUser } = useStore('userStore');
  const { currentChannelId } = useStore('channelStore');
  const { currentUser } = useAuth();

  console.log(message);

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
    await createMessage({
      content: messageContent,
      channelId: currentChannelId,
      userId: currentUser?.uuid,
      uuid: uuid(),
      createdAt: dayjs(),
      timezone: 'toronto',
      parentMessage: message,
    });
  };

  const user = findUser(message.userId);

  console.log(message.childMessages);

  return (
    <Resizable
      width={containerWidth}
      height={Infinity}
      onResize={onResize}
      resizeHandles={resizeHandles}
      minConstraints={[400, Infinity]}
      maxConstraints={[1000, Infinity]}
      transformScale={0.4}
    >
      <div
        className="flex flex-col max-w-md border-l border-border"
        style={{
          maxWidth: '48rem',
          width: `${containerWidth}px`,
        }}
      >
        <Header>
          <p className="text-xl pl-2">Thread</p>
          <Button
            variant="ghost"
            className="p-0 text-2xl"
            size="icon"
            onClick={() => setMessage(null)}
          >
            <X />
          </Button>
        </Header>
        <div className="pl-2 bg-card dark:bg-background rounded-xl shadow-md max-h-full flex flex-col m-2">
          <div className="overflow-auto flex flex-col-reverse justify-start mb-2 flex-1 pr-2 pt-5">
            {childMessages?.map((messageR: MessageDto, index: number) => {
              const displayUser =
                index === 0 || childMessages[index - 1].userId !== messageR.userId;

              return (
                <Message
                  key={messageR.uuid}
                  message={messageR}
                  showUser={displayUser}
                  setThread={setMessage}
                  isThread
                />
              );
            })}

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
