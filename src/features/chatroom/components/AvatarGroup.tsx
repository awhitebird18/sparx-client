import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { API_URL } from '@/config';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Skeleton } from '@/components/ui/Skeleton';

import { User } from '@/features/users/types/user';

const AvatarGroup = () => {
  const { currentChannel } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const { users } = useStore('userStore');
  const channelUsers: User[] = [];

  if (!(currentChannel || users)) return;

  // const userCount = Math.min(3, currentChannel?.users?.length || 1);
  const userCount = 3;

  const avatarSize = 20;

  const componentWidth = `${userCount * avatarSize + 26.5}px`;

  const handleOpenChannelDetails = () => {
    if (!currentChannel) return;
    setActiveModal({
      type: 'ChannelDetailsModal',
      payload: { id: currentChannel.uuid, defaultTab: 'members' },
    });
  };

  return (
    <div
      className={`relative h-full flex justify-end items-center overflow-hidden cursor-pointer bg-background`}
      style={{ width: componentWidth }}
      onClick={handleOpenChannelDetails}
    >
      {/* <p className="w-[20px] h-full flex justify-center items-center text-sm text-muted-foreground">
        {userCount}
      </p> */}
      <Avatar
        className={`absolute w-7 h-7 rounded-md border-2 border-background`}
        style={{ left: `${userCount * avatarSize}px` }}
      >
        <AvatarFallback
          children={userCount}
          className={`w-full h-full text-sm font-medium rounded-sm bg-ring text-white`}
        />
      </Avatar>
      {channelUsers.length ? (
        channelUsers.slice(0, userCount).map((user: User, index: number) => (
          <Avatar
            key={user.uuid}
            className={`absolute w-7 h-7 rounded-md border-2 border-background`}
            style={{ left: `${index * avatarSize}px` }}
          >
            <AvatarImage src={`${API_URL}${user.profileImage}`} />
            <AvatarFallback
              children={user.firstName.charAt(0).toUpperCase()}
              className={`w-full h-full text-sm font-light rounded-sm bg-userDark dark:bg-userDark text-white`}
            />
          </Avatar>
        ))
      ) : (
        <Skeleton className="h-7 w-full rounded-sm" />
      )}
    </div>
  );
};

export default observer(AvatarGroup);
