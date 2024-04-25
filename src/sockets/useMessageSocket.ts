import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';
import { setFavicon } from '@/utils/setFavicon';
import { API_URL } from '@/config/api';

const useMessageSocket = () => {
  const { setUnreadsCount, isWindowVisible, sendBrowserNotification } =
    useStore('notificationStore');
  const { incrementChannelUnreads, channelUnreadsCount } = useStore('channelUnreadStore');
  const { addMessage, removeMessage, updateMessage } = useStore('messageStore');
  const { currentChannelId, channels, findChannelByUuid } = useStore('channelStore');
  const { connectSocket, emitSocket } = useStore('socketStore');
  const { currentUser } = useStore('userStore');

  // Subscribes to messages for each subscribed channel
  useEffect(() => {
    channels.forEach((channel) => {
      emitSocket('joinChannel', channel.uuid);
    });

    return () => {
      channels.forEach((channel) => {
        emitSocket('leaveChannel', channel.uuid);
      });
    };
  }, [emitSocket, channels]);

  // New message
  useEffect(() => {
    if (!currentUser) return;
    return connectSocket('new-message', (data) => {
      const { message } = data.payload;

      if (message.channelId === currentChannelId) {
        addMessage(message);
      } else {
        const channel = findChannelByUuid(message.channelId);
        if (!channel) return;

        incrementChannelUnreads(channel.uuid);
        setUnreadsCount(channelUnreadsCount + 1);
        setFavicon('/faviconUnread.ico');

        if (!isWindowVisible) {
          sendBrowserNotification({
            title: `New message from ${channel.name}`,
            body: message.content,
            icon: `${API_URL}${channel.icon}`,
          });
        }
      }
    });
  }, [
    incrementChannelUnreads,
    channelUnreadsCount,
    connectSocket,
    currentChannelId,
    currentUser,
    findChannelByUuid,
    addMessage,
    isWindowVisible,
    sendBrowserNotification,
    setUnreadsCount,
  ]);

  // Update message
  useEffect(() => {
    return connectSocket('update-message', (data) => {
      const { message } = data.payload;
      if (message.channelId !== currentChannelId) return;

      updateMessage(message);
    });
  }, [connectSocket, currentChannelId, updateMessage]);

  // Remove message
  useEffect(() => {
    return connectSocket('remove-message', (data) => {
      const { messageId, channelId } = data.payload;

      if (channelId !== currentChannelId) return;

      removeMessage(messageId);
    });
  }, [connectSocket, currentChannelId, removeMessage]);

  return null;
};

export default useMessageSocket;
