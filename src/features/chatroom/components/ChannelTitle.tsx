import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/skeleton';
import { useStore } from '@/stores/RootStore';
import { ChevronDown } from 'react-bootstrap-icons';

const ChannelTitle = () => {
  const { currentChannel } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');

  const handleOpenChannelDetails = () => {
    console.log(currentChannel);
    if (!currentChannel) return;
    setActiveModal({ type: 'ChannelDetailsModal', payload: { id: currentChannel.uuid } });
  };

  return (
    <Button
      className="flex items-center h-7 px-3 p-0 hover:bg-transparent"
      variant="ghost"
      onClick={handleOpenChannelDetails}
    >
      {currentChannel ? (
        <Avatar className="rounded-sm w-7 h-7 mr-2">
          {<AvatarImage src={currentChannel.image} />}
          <AvatarFallback
            children={currentChannel.name.substring(0, 2).toUpperCase()}
            className="w-full h-full text-sm rounded-sm"
          />
        </Avatar>
      ) : (
        <Skeleton className="h-7 w-7 rounded-sm" />
      )}

      {currentChannel ? (
        <>
          <p className="h-7 text-lg pr-1">{currentChannel.name.toUpperCase()}</p>
          <ChevronDown className="text-muted-foreground" />
        </>
      ) : (
        <Skeleton className="h-7 w-36" />
      )}
    </Button>
  );
};

export default ChannelTitle;
