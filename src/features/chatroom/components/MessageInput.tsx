import { useAuth } from '@/providers/auth';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { useStore } from '@/stores/RootStore';
import Editor from '@/features/messageInput/Editor';
import { editorConfig } from '@/features/messageInput/configs/editorConfig';
import { observer } from 'mobx-react-lite';

const MessageInput = () => {
  const { currentUser } = useAuth();
  const { createMessage } = useStore('messageStore');
  const { currentChannelId, currentChannel } = useStore('channelStore');

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

  return (
    <div className="border dark:border-indigo-800  dark:shadow-indigo-400 shadow-sm mx-1 my-3 p-2 rounded-lg bg-popover/50">
      <Editor
        placeholder={`Message ${currentChannel?.name}`}
        config={editorConfig}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
observer;

export default observer(MessageInput);
