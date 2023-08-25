import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useAuth } from '@/providers/auth';
import { useStore } from '@/stores/RootStore';
import { setFavicon } from '@/utils/setFavicon';

import { Message } from '@/features/messages/types';
import { UserTyping } from '@/features/userTyping/types';

const SocketController = () => {
  const { currentUser } = useAuth();
  const { setOnlineUsers } = useStore('userStore');
  const { connectSocket, disconnectSocket, emitSocket } = useStore('socketStore');
  const {
    currentChannelId,
    addSubscribedChannel,
    updateSubscribedChannel,
    removeSubscribedChannel,
    subscribedChannels,
    findChannelByUuid,
  } = useStore('channelStore');
  const { addWorkspaceChannel, updateWorkspaceChannel, removeWorkspaceChannel } =
    useStore('workspaceChannelStore');
  const { addUserTyping } = useStore('userTypingStore');
  const { incrementChannelUnreads, channelUnreadsCount } = useStore('channelUnreadStore');
  const { addMessage, removeMessage, updateMessage } = useStore('messageStore');
  const { updateUser, addUser, removeUser } = useStore('userStore');
  const { addSection, updateSection, removeSection } = useStore('sectionStore');
  const { setUnreadsCount, isWindowVisible, sendBrowserNotification } =
    useStore('notificationStore');

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
    return connectSocket('users/update', addUser);
  }, [connectSocket, addUser]);

  // Update user
  useEffect(() => {
    return connectSocket('users/update', updateUser);
  }, [connectSocket, updateUser]);

  // Remove user
  useEffect(() => {
    return connectSocket('users/remove', removeUser);
  }, [connectSocket, removeUser]);

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
    if (!currentUser) return;
    connectSocket('new message', (message: Message) => {
      if (message.userId === currentUser?.uuid) return;
      const channel = findChannelByUuid(message.channelId);

      if (!channel) return;

      if (channel.uuid === currentChannelId) {
        addMessage(message);
      } else {
        incrementChannelUnreads(channel.uuid);
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
    return connectSocket(`messages/${currentChannelId}/update`, updateMessage);
  }, [connectSocket, currentChannelId, updateMessage]);

  // Remove message
  useEffect(() => {
    return connectSocket(`messages/${currentChannelId}/remove`, removeMessage);
  }, [connectSocket, currentChannelId, removeMessage]);

  /* Section Sockets */
  // New section
  useEffect(() => {
    return connectSocket(`sections`, addSection);
  }, [connectSocket, addSection]);

  // Update section
  useEffect(() => {
    return connectSocket(`sections/update`, updateSection);
  }, [connectSocket, updateSection]);

  // Remove section
  useEffect(() => {
    return connectSocket(`sections/remove`, removeSection);
  }, [connectSocket, removeSection]);

  /* Channel Sockets */
  // New workspace channel
  useEffect(() => {
    return connectSocket(`channels`, addWorkspaceChannel);
  }, [connectSocket, addWorkspaceChannel]);

  // Update channel
  useEffect(() => {
    return connectSocket(`channels/update`, (data) => {
      updateWorkspaceChannel(data);
      updateSubscribedChannel(data);
    });
  }, [connectSocket, updateWorkspaceChannel, updateSubscribedChannel]);

  // User typing
  useEffect(() => {
    connectSocket('typing', (data: UserTyping) => {
      if (data.userId === currentUser?.uuid) return;

      addUserTyping(data);
    });
  }, [addUserTyping, connectSocket, currentUser]);

  // Remove workspace channel
  useEffect(() => {
    return connectSocket(`channels/remove`, removeWorkspaceChannel);
  }, [connectSocket, removeWorkspaceChannel]);

  // User joins channel
  useEffect(() => {
    return connectSocket(`channel-subscriptions/join`, addSubscribedChannel);
  }, [connectSocket, addSubscribedChannel]);

  // User leaves channel
  useEffect(() => {
    return connectSocket(`channel-subscriptions/leave`, removeSubscribedChannel);
  }, [connectSocket, removeSubscribedChannel]);

  return null;
};

export default observer(SocketController);
