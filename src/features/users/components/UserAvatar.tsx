import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';
import { PersonFill } from 'react-bootstrap-icons';
import { User } from '..';
import { API_URL } from '@/config';
import { observer } from 'mobx-react-lite';

type UserAvatarProps = {
  size?: number;
  showStatus?: boolean;
  src?: string | null;
  userId: string | undefined;
};

const UserAvatar = ({ size = 40, showStatus, userId }: UserAvatarProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { findUser } = useStore('userStore');

  useEffect(() => {
    if (!userId) return;
    setUser(findUser(userId));
  }, [findUser, userId]);

  if (!user) <div />;

  return (
    <Avatar
      className="relative overflow-visible"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <AvatarImage
        src={`${API_URL}${user?.profileImage}`}
        style={{ height: `${size}px`, width: `${size}px` }}
        className="rounded-lg"
      />
      <AvatarFallback
        className={`h-full flex-1 w-full rounded-sm border border-border overflow-hidden bg-card`}
        children={
          <PersonFill
            className={`mt-2 text-indigo-500`}
            style={{ height: `${size * 5}px`, width: `${size * 5}px` }}
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

export default observer(UserAvatar);
