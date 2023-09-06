import { observer } from 'mobx-react-lite';
import { ChevronDown } from 'react-bootstrap-icons';

import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import ChannelIcon from '@/features/channels/components/ChannelIcon';
import { useStore } from '@/stores/RootStore';
import { ChannelType } from '@/features/channels/enums';

const ChannelTitle = () => {
  const { currentChannel } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const { findUserByName } = useStore('userStore');

  const handleOpenChannelDetails = () => {
    if (!currentChannel) return;
    setActiveModal({
      type: 'ChannelDetailsModal',
      payload: { id: currentChannel.uuid, defaultTab: 'about' },
    });
  };

  let channelIcon = currentChannel?.icon;
  let userId = undefined;

  if (currentChannel?.type === ChannelType.DIRECT) {
    const user = findUserByName(currentChannel.name);
    if (!user) return;
    channelIcon = user.profileImage;
    userId = user.uuid;
  }

  return (
    <Button
      className="flex items-center h-full p-0 hover:bg-transparent gap-3 justify-start"
      variant="ghost"
      onClick={handleOpenChannelDetails}
    >
      {currentChannel ? (
        <ChannelIcon
          imageUrl={channelIcon}
          size={38}
          isSelected
          isPrivate={currentChannel.isPrivate}
          textPrimary
          userId={userId}
        />
      ) : (
        <Skeleton className="h-full w-7 rounded-sm" />
      )}

      <div className="flex flex-col justify-center gap-0.5" style={{ height: '38px' }}>
        {currentChannel ? (
          <div className="flex items-center gap-1 leading-none" style={{ height: '22px' }}>
            <p className="text-xl flex items-center whitespace-nowrap overflow-hidden text-ellipsis w-min">
              {currentChannel.name}
            </p>
            <ChevronDown className="mt-0.5 ml-3" size={16} />
          </div>
        ) : (
          <Skeleton className="h-full w-36" />
        )}
        {currentChannel?.topic && (
          <p
            className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap text-start h-min leading-none"
            style={{ height: '16px' }}
          >
            {currentChannel.topic}
          </p>
        )}
      </div>
    </Button>
  );
};

export default observer(ChannelTitle);
