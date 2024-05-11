import { useStore } from '@/stores/RootStore';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

const useMessageHandler = () => {
  const { createMessageApi } = useStore('messageStore');
  const { emitSocket } = useStore('socketStore');
  const { currentChannelId } = useStore('channelStore');
  const { currentUser } = useStore('userStore');

  const sendMessage = async (messageContent: string) => {
    if (!currentChannelId || !currentUser) return;

    await createMessageApi({
      content: messageContent,
      channelId: currentChannelId,
      userId: currentUser.uuid,
      uuid: uuid(),
      createdAt: dayjs().toISOString(),
    });

    emitSocket('stopped-typing', {
      userId: currentUser.uuid,
      channelId: currentChannelId,
    });
  };

  const handleTyping = useCallback(
    (text: string) => {
      if (!text) return;
      emitSocket('typing', {
        userId: currentUser?.uuid,
        username: currentUser?.firstName,
        channelId: currentChannelId,
      });
    },
    [currentChannelId, currentUser, emitSocket],
  );

  return { sendMessage, handleTyping };
};

export default useMessageHandler;
