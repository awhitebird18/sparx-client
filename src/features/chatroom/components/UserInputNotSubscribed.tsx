import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/stores/RootStore';

import { Button } from '@/components/ui/Button';
import ChannelIcon from '@/features/channels/components/ChannelIcon';
import { ChannelType } from '@/features/channels/enums';

const UserInputNotSubscribed = () => {
  const { currentChannel, joinChannelApi, updateSubscribedChannel } = useStore('channelStore');
  const { findSectionByChannelType, addChannelUuidToSection } = useStore('sectionStore');
  const { formatAutomatedMessage, createMessageApi } = useStore('messageStore');
  const { currentUser } = useStore('userStore');
  const navigate = useNavigate();

  const handleNavigateToChannelsPage = () => {
    navigate('/app/channels');
  };

  const handleJoinChannel = async () => {
    if (!currentChannel || !currentUser) return;

    const section = findSectionByChannelType(ChannelType.CHANNEL);
    if (!section) return;

    const formattedMessage = formatAutomatedMessage({
      userId: currentUser.uuid,
      channelId: currentChannel.uuid,
      content: `has joined the channel.`,
    });

    const joinChannelPromise = joinChannelApi({
      channelId: currentChannel.uuid,
      sectionId: section.uuid,
    });
    const createMessagePromise = createMessageApi(formattedMessage);

    await Promise.all([joinChannelPromise, createMessagePromise]);

    addChannelUuidToSection(currentChannel.uuid, section.uuid);
    updateSubscribedChannel({ ...currentChannel, isTemp: false });
  };

  return (
    <div className="flex items-center justify-center border-border flex-col gap-4 p-6 bg-card rounded-xl border">
      <div className="text-3xl flex items-center gap-2">
        <ChannelIcon
          imageUrl={currentChannel?.icon}
          size={28}
          isPrivate={currentChannel?.isPrivate}
        />
        {currentChannel?.name}
      </div>
      <div className="text-lg">{currentChannel?.description}</div>
      <Button
        className="bg-userMedium text-white hover:bg-primary-dark"
        onClick={handleJoinChannel}
      >
        Join Channel
      </Button>
      <Button
        variant="link"
        onClick={handleNavigateToChannelsPage}
        className="text-muted-foreground"
      >
        Back to all channels
      </Button>
    </div>
  );
};

export default observer(UserInputNotSubscribed);
