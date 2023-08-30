import { observer } from 'mobx-react-lite';
import { ChevronDown } from 'react-bootstrap-icons';

import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import ChannelIcon from '@/features/channels/components/ChannelIcon';
import { useStore } from '@/stores/RootStore';

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
      className="flex items-center h-full p-0 hover:bg-transparent gap-3 justify-start"
      variant="ghost"
      onClick={handleOpenChannelDetails}
    >
      {currentChannel ? (
        <ChannelIcon
          imageUrl={currentChannel.icon}
          size={28}
          isSelected
          isPrivate={currentChannel.isPrivate}
          textPrimary
        />
      ) : (
        <Skeleton className="h-full w-7 rounded-sm" />
      )}

      {currentChannel ? (
        <div className="flex items-center gap-3">
          <p className="h-full text-xl flex items-center whitespace-nowrap overflow-hidden text-ellipsis w-min">
            {currentChannel.name}
            <ChevronDown className="mt-1 text-sm ml-2" />
          </p>
        </div>
      ) : (
        <Skeleton className="h-full w-36" />
      )}
      {currentChannel?.topic && (
        <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap w-60">
          {currentChannel.topic}
        </p>
      )}
    </Button>
  );
};

export default observer(ChannelTitle);
