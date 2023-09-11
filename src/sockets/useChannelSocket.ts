import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

const useChannelSocket = () => {
  const { addChannelUuidToSection, removeChannelUuidFromSection } = useStore('sectionStore');
  const { updateWorkspaceChannel } = useStore('workspaceChannelStore');
  const { connectSocket, emitSocket } = useStore('socketStore');
  const { addSubscribedChannel, removeSubscribedChannel, updateSubscribedChannel } =
    useStore('channelStore');

  // Subscribes to workspace room
  useEffect(() => {
    emitSocket('joinWorkspace', 'tempWorkspaceId');

    return () => emitSocket('leaveWorkspace', 'tempWorkspaceId');
  }, [emitSocket]);

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
    return connectSocket(`update-channel`, (data) => {
      updateWorkspaceChannel(data);
      updateSubscribedChannel(data);
    });
  }, [connectSocket, updateWorkspaceChannel, updateSubscribedChannel]);
  return null;
};

export default useChannelSocket;
