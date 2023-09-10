import { PersonFill } from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import OnlineStatusIndicator from './OnlineStatusIndicator';
import { UserStatus } from '../enums';

type UserAvatarProps = {
  size?: number;
  showStatus?: boolean;
  userId: string;
  profileImage?: string;
  onlineStatus?: UserStatus;
  rounded?: string;
};

const UserAvatar = ({
  size = 40,
  profileImage,
  userId,
  showStatus,
  rounded = 'rounded-lg',
}: UserAvatarProps) => {
  return (
    <Avatar
      className={`relative overflow-visible ${rounded}`}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <AvatarImage
        src={profileImage}
        style={{ height: `${size}px`, width: `${size}px` }}
        className={`${rounded} border border-border`}
      />
      <AvatarFallback
        className={`h-full flex-1 w-full ${rounded} border border-border overflow-hidden bg-card`}
        children={
          <PersonFill
            className={`mt-2 text-primary-dark`}
            style={{ height: `${size * 5}px`, width: `${size * 5}px` }}
          />
        }
      />

      {showStatus && (
        <div className="rounded-full absolute -bottom-1.5 -right-1.5 w-4 h-4 flex justify-center items-center">
          <OnlineStatusIndicator userId={userId} />
        </div>
      )}
    </Avatar>
  );
};

export default observer(UserAvatar);
