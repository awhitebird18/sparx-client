import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

const useChannelSocket = () => {
  const { addChannelUuidToSection, removeChannelUuidFromSection } = useStore('sectionStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { connectSocket, emitSocket } = useStore('socketStore');
  const {
    addSubscribedChannel,
    updateSubscribedChannel,
    leaveChannel,
    removeSubscribedChannel,
    updateChannelUserCount,
  } = useStore('channelStore');

  // Subscribes to workspace room
  useEffect(() => {
    emitSocket('joinWorkspace', currentWorkspaceId);

    return () => emitSocket('leaveWorkspace', currentWorkspaceId);
  }, [emitSocket, currentWorkspaceId]);

  // Join channel
  useEffect(() => {
    connectSocket('join-channel', (data) => {
      const { channel, sectionId } = data.payload;

      addSubscribedChannel(channel);
      addChannelUuidToSection(channel.uuid, sectionId);
    });
  }, [connectSocket, addSubscribedChannel, addChannelUuidToSection]);

  // Leave channel
  useEffect(() => {
    connectSocket(`leave-channel`, (data) => {
      leaveChannel(data.payload.uuid);

      // removeSubscribedChannel(channelId);
      // removeChannelUuidFromSection(channelId);
    });
  }, [connectSocket, leaveChannel]);

  // Update channel section
  useEffect(() => {
    connectSocket('update-channel-section', (data) => {
      const { channelId, sectionId } = data.payload;

      removeChannelUuidFromSection(channelId);
      addChannelUuidToSection(channelId, sectionId);
    });
  }, [addChannelUuidToSection, connectSocket, removeChannelUuidFromSection]);

  // Update channel
  useEffect(() => {
    connectSocket('update-channel', (data) => {
      updateSubscribedChannel(data.payload);
      updateSubscribedChannel(data.payload);
    });
  }, [connectSocket, updateSubscribedChannel, updateChannelUserCount]);

  // Remove channel
  useEffect(() => {
    connectSocket('remove-channel', (data) => {
      const { channelId } = data.payload;
      removeSubscribedChannel(channelId);
    });
  }, [connectSocket, removeSubscribedChannel]);

  return null;
};

export default useChannelSocket;
