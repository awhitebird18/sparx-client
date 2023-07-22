import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { PersonFill } from 'react-bootstrap-icons';
import { API_URL } from '@/config';
import { observer } from 'mobx-react-lite';
import OnlineStatusIndicator from './OnlineStatusIndicator';
import { useStore } from '@/stores/RootStore';

type UserAvatarProps = {
  size?: number;
  showStatus?: boolean;
  userId: string;
  profileImage?: string;
};

const UserAvatar = ({ size = 40, showStatus, userId, profileImage }: UserAvatarProps) => {
  const { onlineUsers } = useStore('userStore');

  return (
    <Avatar
      className="relative overflow-visible"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <AvatarImage
        src={`${API_URL}${profileImage}`}
        style={{ height: `${size}px`, width: `${size}px` }}
        className="rounded-lg"
      />
      <AvatarFallback
        className={`h-full flex-1 w-full rounded-sm border border-border overflow-hidden bg-card`}
        children={
          <PersonFill
            className={`mt-2 text-userMedium`}
            style={{ height: `${size * 5}px`, width: `${size * 5}px` }}
          />
        }
      />

      {showStatus && (
        <div className="rounded-full absolute -bottom-1.5 -right-1.5 w-4 h-4 flex justify-center items-center">
          {onlineUsers.has(userId) && <OnlineStatusIndicator userId={userId} />}
        </div>
      )}
    </Avatar>
  );
};

export default observer(UserAvatar);
