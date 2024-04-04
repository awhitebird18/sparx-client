import { PersonFill } from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import OnlineStatusIndicator from './OnlineStatusIndicator';
import { UserStatus } from '../enums';

import { twMerge } from 'tailwind-merge';
import { useStore } from '@/stores/RootStore';

type UserAvatarProps = {
  size?: number;
  showStatus?: boolean;
  userId: string;
  profileImage?: string;
  onlineStatus?: UserStatus;
  rounded?: string;
  color?: string;
};

const UserAvatar = ({
  size = 44,
  profileImage,
  color,
  userId,
  showStatus,
  rounded = 'rounded-md',
}: UserAvatarProps) => {
  const { findUserByUuid } = useStore('userStore');
  const user = findUserByUuid(userId);

  const bgColorClass = color
    ? `from-primary-lighter to-${user?.preferences.primaryColor}-400`
    : 'bg-primary-lightest border-primary-lighter border dark:border-primary-dark';

  const avatarClass = twMerge(
    `relative ${rounded} overflow-visible bg-gradient-to-tr`,
    bgColorClass,
  );

  return (
    <Avatar className={avatarClass} style={{ height: `${size}px`, width: `${size}px` }}>
      <AvatarImage
        src={profileImage}
        style={{ height: `${size}px`, width: `${size}px` }}
        className={`${rounded}`}
      />
      {!profileImage && (
        <AvatarFallback
          // delayMs={00}
          className={`h-full flex-1 w-full ${rounded} overflow-hidden bg-transparent`}
          children={
            <PersonFill
              className={`mt-3 ${color ? 'text-white/70' : 'text-primary'}`}
              style={{ height: `${size * 5}px`, width: `${size * 5}px` }}
            />
          }
        />
      )}

      {showStatus && (
        <div className="rounded-full absolute -bottom-1.5 -right-1.5 flex justify-center items-center">
          <OnlineStatusIndicator userId={userId} />
        </div>
      )}
    </Avatar>
  );
};

export default observer(UserAvatar);
