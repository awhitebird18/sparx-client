import { observer } from 'mobx-react-lite';
import { ChevronDown } from 'react-bootstrap-icons';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import ChannelIcon from '@/features/channels/components/ChannelIcon';
import { useStore } from '@/stores/RootStore';
import { ChannelType } from '@/features/channels/enums';

const ChannelTitle = observer(() => {
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
      {channelIcon ? (
        <ChannelIcon
          imageUrl={channelIcon}
          size={34}
          isSelected
          isPrivate={currentChannel?.isPrivate}
          textPrimary
          userId={userId}
        />
      ) : null}

      {!currentChannel ? <Skeleton className="h-full w-7 rounded-sm" /> : null}

      <div className="flex justify-center items-center gap-4">
        {currentChannel ? (
          <div className="flex items-center gap-1">
            <p className="text-xl flex items-center whitespace-nowrap overflow-hidden text-ellipsis w-min">
              {currentChannel.name}
            </p>
            <ChevronDown className="mt-1 ml-1" size={14} />
          </div>
        ) : (
          <Skeleton className="h-full w-36" />
        )}
        {currentChannel?.topic && (
          <p className="text-sm text-main font-normal overflow-hidden text-ellipsis whitespace-nowrap text-start">
            {currentChannel.topic}
          </p>
        )}
      </div>
    </Button>
  );
});

export default ChannelTitle;
