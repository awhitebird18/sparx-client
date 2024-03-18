import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

const useChannelSocket = () => {
  const { addChannelUuidToSection, removeChannelUuidFromSection } = useStore('sectionStore');
  const { updateWorkspaceChannel, updateChannelUserCount } = useStore('workspaceChannelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { connectSocket, emitSocket } = useStore('socketStore');
  const { addSubscribedChannel, updateSubscribedChannel, leaveChannel, removeSubscribedChannel } =
    useStore('channelStore');

  // Subscribes to workspace room
  useEffect(() => {
    emitSocket('joinWorkspace', currentWorkspaceId);

    return () => emitSocket('leaveWorkspace', currentWorkspaceId);
  }, [emitSocket, currentWorkspaceId]);

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
      leaveChannel(data.payload.uuid);

      // removeSubscribedChannel(channelId);
      // removeChannelUuidFromSection(channelId);
    });
  }, [connectSocket, leaveChannel]);

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
    return connectSocket('update-channel', (data) => {
      updateWorkspaceChannel(data);
      updateSubscribedChannel(data);
    });
  }, [connectSocket, updateWorkspaceChannel, updateSubscribedChannel, updateChannelUserCount]);

  // Remove channel
  useEffect(() => {
    return connectSocket('remove-channel', (data) => {
      const { channelId } = data.payload;
      removeSubscribedChannel(channelId);
    });
  }, [connectSocket, removeSubscribedChannel]);

  return null;
};

export default useChannelSocket;
