import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useStore } from '@/stores/RootStore';
import { ChevronDown, Hash } from 'react-bootstrap-icons';

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
        <Avatar className="rounded-sm w-7 h-7 mr-0.5">
          {<AvatarImage src={currentChannel.image} />}
          <AvatarFallback
            children={<Hash className="text-3xl" />}
            className="w-full h-full text-sm rounded-sm dark:bg-transparent"
          />
        </Avatar>
      ) : (
        <Skeleton className="h-7 w-7 rounded-sm" />
      )}

      {currentChannel ? (
        <>
          <p className="h-7 text-xl pr-2">
            {currentChannel.name.charAt(0).toUpperCase()}
            {currentChannel.name.substring(1).toLowerCase()}
          </p>
          <ChevronDown className="text-muted-foreground" />
        </>
      ) : (
        <Skeleton className="h-7 w-36" />
      )}
    </Button>
  );
};

export default ChannelTitle;
