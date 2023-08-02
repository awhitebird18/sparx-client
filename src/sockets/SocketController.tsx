import { UserTyping } from '@/features/channels';
import { Message } from '@/features/messages';
import { useAuth } from '@/providers/auth';
import { useStore } from '@/stores/RootStore';
import { setFavicon } from '@/utils/setFavicon';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const SocketController = () => {
  const { setOnlineUsers } = useStore('userStore');
  const { connectSocket, disconnectSocket, emitSocket } = useStore('socketStore');
  const {
    currentChannelId,
    addChannel,
    removeChannel,
    handleUpdateSubscribedChannelSocket,
    joinChannel,
    leaveChannel,
    subscribedChannels,
    findById,
    addToChannelUnreads,
    addUserTyping,
    channelUnreadsCount,
  } = useStore('channelStore');
  const { handleNewMessageSocket, handleDeleteMessageSocket, handleUpdateMessageSocket } =
    useStore('messageStore');
  const { handleUpdateUserSocket, handleNewUserSocket, handleRemoveserSocket } =
    useStore('userStore');
  const { addSection, handleUpdateSectionSocket, deleteSection } = useStore('sectionStore');
  const { setUnreadsCount, isWindowVisible, sendBrowserNotification } =
    useStore('notificationStore');
  const { currentUser } = useAuth();

  /* User Sockets */
  // Online users
  useEffect(() => {
    return connectSocket('online-users', setOnlineUsers);
  }, [connectSocket, setOnlineUsers]);

  // User heartbeat
  useEffect(() => {
    setInterval(() => emitSocket('heartbeat', setOnlineUsers), 10000);
  }, [connectSocket, disconnectSocket, emitSocket, setOnlineUsers]);

  // New user
  useEffect(() => {
    return connectSocket('users/update', handleNewUserSocket);
  }, [connectSocket, handleNewUserSocket]);

  // Update user
  useEffect(() => {
    return connectSocket('users/update', handleUpdateUserSocket);
  }, [connectSocket, handleUpdateUserSocket]);

  // Remove user
  useEffect(() => {
    return connectSocket('users/remove', handleRemoveserSocket);
  }, [connectSocket, handleRemoveserSocket]);

  /* Message Sockets */
  // Subscribes to new channel messages
  useEffect(() => {
    subscribedChannels.forEach((channel) => {
      emitSocket('subscribe', channel.uuid);
    });

    // Make sure to unsubscribe when the component unmounts
    return () => {
      subscribedChannels.forEach((channel) => {
        emitSocket('unsubscribe', channel.uuid);
      });
    };
  }, [emitSocket, subscribedChannels]);

  // New message
  useEffect(() => {
    connectSocket('new message', (message: Message) => {
      if (message.userId === currentUser?.uuid) return;
      const channel = findById(message.channelId);

      if (!channel) return;

      if (channel.channelId === currentChannelId) {
        handleNewMessageSocket(message);
      } else {
        addToChannelUnreads(channel.channelId);
        setUnreadsCount(channelUnreadsCount + 1);
        setFavicon('/faviconUnread.ico');

        if (!isWindowVisible) {
          sendBrowserNotification({
            title: `New message from ${channel.name}`,
            body: message.content,
            icon: `http://localhost:3000${channel.icon}`,
          });
        }
      }
    });
  }, [
    addToChannelUnreads,
    channelUnreadsCount,
    connectSocket,
    currentChannelId,
    currentUser?.uuid,
    findById,
    handleNewMessageSocket,
    isWindowVisible,
    sendBrowserNotification,
    setUnreadsCount,
  ]);

  // Update message
  useEffect(() => {
    return connectSocket(`messages/${currentChannelId}/update`, handleUpdateMessageSocket);
  }, [connectSocket, currentChannelId, handleUpdateMessageSocket]);

  // Remove message
  useEffect(() => {
    return connectSocket(`messages/${currentChannelId}/remove`, handleDeleteMessageSocket);
  }, [connectSocket, currentChannelId, handleDeleteMessageSocket, handleNewMessageSocket]);

  /* Section Sockets */
  // New section
  useEffect(() => {
    return connectSocket(`sections`, addSection);
  }, [connectSocket, addSection]);

  // Update section
  useEffect(() => {
    return connectSocket(`sections/update`, handleUpdateSectionSocket);
  }, [connectSocket, handleUpdateSectionSocket]);

  // Remove section
  useEffect(() => {
    return connectSocket(`sections/remove`, deleteSection);
  }, [connectSocket, deleteSection]);

  /* Channel Sockets */
  // New workspace channel
  useEffect(() => {
    return connectSocket(`channels`, addChannel);
  }, [connectSocket, addChannel]);

  // Update channel
  useEffect(() => {
    return connectSocket(`channels/update`, handleUpdateSubscribedChannelSocket);
  }, [connectSocket, handleUpdateSubscribedChannelSocket]);

  // User typing
  useEffect(() => {
    connectSocket('typing', (data: UserTyping) => {
      if (data.userId === currentUser?.uuid) return;

      addUserTyping(data);
    });
  }, [addUserTyping, connectSocket, currentUser]);

  // Remove workspace channel
  useEffect(() => {
    return connectSocket(`channels/remove`, removeChannel);
  }, [connectSocket, removeChannel]);

  // User joins channel
  useEffect(() => {
    return connectSocket(`userchannels/join`, joinChannel);
  }, [connectSocket, joinChannel]);

  // User leaves channel
  useEffect(() => {
    return connectSocket(`userchannels/leave`, leaveChannel);
  }, [connectSocket, leaveChannel]);

  return null;
};

export default observer(SocketController);
