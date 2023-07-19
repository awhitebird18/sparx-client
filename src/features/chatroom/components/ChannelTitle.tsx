import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import ChannelIcon from '@/features/channels/components/ChannelIcon';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ChevronDown } from 'react-bootstrap-icons';

const ChannelTitle = () => {
  const { currentChannel } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');

  const handleOpenChannelDetails = () => {
    if (!currentChannel) return;
    setActiveModal({
      type: 'ChannelDetailsModal',
      payload: { id: currentChannel.uuid, defaultTab: 'about' },
    });
  };

  return (
    <Button
      className="flex items-center h-7 p-0 hover:bg-transparent"
      variant="ghost"
      onClick={handleOpenChannelDetails}
    >
      {currentChannel ? (
        <ChannelIcon channelId={currentChannel.uuid} size={28} isSelected />
      ) : (
        <Skeleton className="h-7 w-7 rounded-sm" />
      )}

      {currentChannel ? (
        <>
          <p className="h-7 text-xl px-2">
            {currentChannel.name.charAt(0).toUpperCase()}
            {currentChannel.name.substring(1).toLowerCase()}
          </p>
          <ChevronDown className="mt-1" />
        </>
      ) : (
        <Skeleton className="h-7 w-36" />
      )}
    </Button>
  );
};

export default observer(ChannelTitle);
