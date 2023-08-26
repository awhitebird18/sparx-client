import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/stores/RootStore';

import { Button } from '@/components/ui/Button';
import ChannelIcon from '@/features/channels/components/ChannelIcon';

const UserInputNotSubscribed = () => {
  const { currentChannel, currentChannelId, joinChannelApi } = useStore('channelStore');
  const navigate = useNavigate();

  const handleNavigateToChannelsPage = () => {
    navigate('/app/channels');
  };

  const handleJoinChannel = async () => {
    if (!currentChannelId) return;

    await joinChannelApi(currentChannelId);
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
      <Button className="bg-userMedium text-white hover:bg-userDark" onClick={handleJoinChannel}>
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
