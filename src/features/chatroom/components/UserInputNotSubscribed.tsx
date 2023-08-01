import { Button } from '@/components/ui/Button';
import { joinChannelApi } from '@/features/channels/api/joinChannel';
import ChannelIcon from '@/features/channels/components/ChannelIcon';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const UserInputNotSubscribed = () => {
  const { currentChannel } = useStore('channelStore');
  const navigate = useNavigate();

  const handleNavigateToChannelsPage = () => {
    navigate('/app/channels');
  };

  const handleJoinChannel = async () => {
    if (!currentChannel) return;
    await joinChannelApi(currentChannel.uuid);
  };

  return (
    <div className="flex items-center justify-center border-border flex-col gap-4 p-6 bg-card rounded-xl border">
      <div className="text-3xl flex items-center gap-2">
        <ChannelIcon imageUrl={currentChannel?.icon} size={28} /> {currentChannel?.name}
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
