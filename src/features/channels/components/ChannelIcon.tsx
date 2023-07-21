import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';
import { Hash } from 'react-bootstrap-icons';
import { Channel } from '..';
import { API_URL } from '@/config';
import { observer } from 'mobx-react-lite';

type UserAvatarProps = {
  size?: number;
  showStatus?: boolean;
  channelId: string | undefined;
  isSelected?: boolean | undefined;
};

const ChannelIcon = ({ size = 40, showStatus, channelId, isSelected }: UserAvatarProps) => {
  const [channel, setChannel] = useState<Channel | undefined>(undefined);
  const { findById } = useStore('channelStore');

  useEffect(() => {
    if (!channelId) return;
    setChannel(findById(channelId));
  }, [findById, channelId]);

  if (!channel) <div />;

  return (
    <Avatar
      className="relative overflow-visible"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <AvatarImage
        src={`${API_URL}${channel?.icon}`}
        style={{ height: `${size}px`, width: `${size}px` }}
        className="rounded-sm"
      />
      <AvatarFallback
        className={`h-full flex-1 w-full rounded-sm overflow-hidden dark:bg-transparent`}
        children={
          <Hash
            className={`text-userMedium text-xl dark:bg-transparent ${
              isSelected ? 'text-primary bg-background' : 'text-muted-foreground'
            }`}
            style={{
              height: `${size * 0.8}px`,
              width: `${size * 0.8}px`,
            }}
          />
        }
      />

      {showStatus && (
        <div className="rounded-full absolute -bottom-1.5 -right-1.5 w-4 h-4 flex justify-center items-center">
          <div className="rounded-full w-2.5 h-2.5 bg-teal-500"></div>
        </div>
      )}
    </Avatar>
  );
};

export default observer(ChannelIcon);
