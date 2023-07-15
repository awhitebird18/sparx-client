import { useAuth } from '@/providers/auth';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { useStore } from '@/stores/RootStore';
import Editor from '@/features/messageInput/Editor';
import { editorConfig } from '@/features/messageInput/configs/editorConfig';

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
    <div className="rounded-xl shadow-md p-2">
      <Editor
        placeholder={`Message ${currentChannel?.name}`}
        config={editorConfig}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MessageInput;
