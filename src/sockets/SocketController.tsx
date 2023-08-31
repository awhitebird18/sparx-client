import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/stores/RootStore';
import { setFavicon } from '@/utils/setFavicon';

import { Message } from '@/features/messages/types';
import { UserTyping } from '@/features/userTyping/types';
import { UserStatus } from '@/features/users/enums';

import { API_URL } from '@/config';

const SocketController = () => {
  const { setOnlineUsers, currentUser } = useStore('userStore');
  const { connectSocket, emitSocket } = useStore('socketStore');
  const {
    currentChannelId,
    addSubscribedChannel,
    updateSubscribedChannel,
    removeSubscribedChannel,
    subscribedChannels,
    findChannelByUuid,
  } = useStore('channelStore');
  const { updateWorkspaceChannel, removeWorkspaceChannel, updateChannelUserCount } =
    useStore('workspaceChannelStore');
  const { addUserTyping } = useStore('userTypingStore');
  const { incrementChannelUnreads, channelUnreadsCount } = useStore('channelUnreadStore');
  const { addMessage, removeMessage, updateMessage } = useStore('messageStore');
  const { updateUser, addUser, removeUser, userOnlineStatus } = useStore('userStore');
  const {
    addSection,
    updateSection,
    removeSection,
    addChannelUuidToSection,
    removeChannelUuidFromSection,
    setSections,
  } = useStore('sectionStore');
  const { setUnreadsCount, isWindowVisible, sendBrowserNotification } =
    useStore('notificationStore');

  /* User Sockets */
  // Online users
  useEffect(() => {
    return connectSocket('online-users', setOnlineUsers);
  }, [connectSocket, setOnlineUsers]);

  // User heartbeat
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (userOnlineStatus !== UserStatus.OFFLINE) {
      intervalId = setInterval(() => {
        emitSocket('heartbeat', { status: userOnlineStatus });
      }, 10000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [emitSocket, userOnlineStatus]);

  // New user
  useEffect(() => {
    return connectSocket('users/new', addUser);
  }, [connectSocket, addUser]);

  // Update user
  useEffect(() => {
    return connectSocket('users/update', (data) => {
      const { user } = data.payload;

      updateUser(user);
    });
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
    return connectSocket(`messages/${currentChannelId}/update`, updateMessage);
  }, [connectSocket, currentChannelId, updateMessage]);

  // Remove message
  useEffect(() => {
    return connectSocket(`messages/${currentChannelId}/remove`, removeMessage);
  }, [connectSocket, currentChannelId, removeMessage]);

  /* Section Sockets */
  // New section
  useEffect(() => {
    return connectSocket(`sections`, (data) => {
      const { section } = data.payload;

      addSection(section);
    });
  }, [connectSocket, addSection]);

  useEffect(() => {
    return connectSocket('user-sections', (data) => {
      const { sections } = data.payload;

      setSections(sections);
    });
  }, [connectSocket, setSections]);

  // Update section
  useEffect(() => {
    return connectSocket(`sections/update`, (data) => {
      const { section } = data.payload;

      delete section.channelIds;

      updateSection(section);
    });
  }, [connectSocket, updateSection]);

  // Remove section
  useEffect(() => {
    return connectSocket(`sections/remove`, removeSection);
  }, [connectSocket, removeSection]);

  /* Channel Sockets */
  // Join channel
  useEffect(() => {
    return connectSocket('join-channel', (data) => {
      const { channel, sectionId } = data.payload;

      addSubscribedChannel(channel);
      addChannelUuidToSection(channel.uuid, sectionId);
    });
  }, [connectSocket, addSubscribedChannel, addChannelUuidToSection]);

  // Leave channel
  useEffect(() => {
    return connectSocket(`leave-channel`, (data) => {
      const { channelId } = data.payload;

      removeSubscribedChannel(channelId);
      removeChannelUuidFromSection(channelId);
    });
  }, [connectSocket, removeSubscribedChannel, removeChannelUuidFromSection]);

  // Update channel section
  useEffect(() => {
    return connectSocket('update-channel-section', (data) => {
      const { channelId, sectionId } = data.payload;

      removeChannelUuidFromSection(channelId);
      addChannelUuidToSection(channelId, sectionId);
    });
  }, [addChannelUuidToSection, connectSocket, removeChannelUuidFromSection]);

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

  // Update channel count
  useEffect(() => {
    return connectSocket('update-channel-count', (data) => {
      const { channelUserCount } = data.payload;

      updateChannelUserCount(channelUserCount);
    });
  }, [connectSocket, updateChannelUserCount]);

  // Remove workspace channel
  useEffect(() => {
    return connectSocket(`channels/remove`, removeWorkspaceChannel);
  }, [connectSocket, removeWorkspaceChannel]);

  return null;
};

export default observer(SocketController);
