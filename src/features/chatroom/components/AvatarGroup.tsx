import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Skeleton } from '@/components/ui/Skeleton';
import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';

const AvatarGroup = () => {
  const { currentChannel, channelUserIds } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const { findUserByUuid } = useStore('userStore');

  const userCount = Math.min(3, channelUserIds.length || 1);
  // const userCount = channelUserIds.length;

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
      className={`relative h-full flex justify-end items-center overflow-hidden cursor-pointer dark:bg-background`}
      style={{ width: componentWidth }}
      onClick={handleOpenChannelDetails}
    >
      <Avatar
        className={`absolute w-7 h-7 rounded-md border-2 border-border`}
        style={{ left: `${userCount * avatarSize}px` }}
      >
        <AvatarFallback
          children={userCount}
          className={`w-full h-full text-base font-medium rounded-sm bg-secondary text-main pl-0.5`}
        />
      </Avatar>
      {userCount ? (
        channelUserIds.slice(0, userCount).map((userId: string, index: number) => {
          const user = findUserByUuid(userId);
          if (!user) return;

          const transformedImage = transformCloudinaryUrl(user.profileImage, 60, 60);

          return (
            <Avatar
              key={user.uuid}
              className={`absolute w-7 h-7 rounded-md border-2 border-border`}
              style={{ left: `${index * avatarSize}px` }}
            >
              <AvatarImage src={transformedImage} />
              <AvatarFallback
                children={user.firstName.charAt(0).toUpperCase()}
                className={`w-full h-full text-sm font-light rounded-sm bg-primary dark:bg-primary-dark text-white`}
              />
            </Avatar>
          );
        })
      ) : (
        <Skeleton className="h-7 w-full rounded-sm" />
      )}
    </div>
  );
};

export default observer(AvatarGroup);
