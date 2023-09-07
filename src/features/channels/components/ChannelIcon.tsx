import { Hash, Lock } from 'react-bootstrap-icons';
import { API_URL } from '@/config';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import OnlineStatusIndicator from '@/features/users/components/OnlineStatusIndicator';

type UserAvatarProps = {
  size?: number;
  showStatus?: boolean;
  imageUrl?: string;
  userId?: string;
  isSelected?: boolean | undefined;
  isPrivate?: boolean | undefined;
  textPrimary?: boolean;
};

const ChannelIcon = ({
  size = 40,
  imageUrl,
  isSelected,
  isPrivate,
  textPrimary,
  userId,
}: UserAvatarProps) => (
  <Avatar
    className="relative overflow-visible"
    style={{ height: `${size}px`, width: `${size}px ` }}
  >
    <AvatarImage
      src={`${API_URL}${imageUrl}`}
      style={{ height: `${size}px`, width: `${size}px` }}
      className={`rounded-${size > 30 ? 'lg' : 'sm'}`}
    />
    <AvatarFallback
      className={`h-full flex-1 w-full rounded-sm overflow-hidden bg-transparent dark:bg-transparent`}
      children={
        isPrivate ? (
          <Lock
            className={`p-0 text-xl ${
              isSelected && !textPrimary ? 'text-userDark' : 'text-neutral'
            } ${textPrimary && 'text-primary'}`}
            style={{
              height: `${size - 6}px`,
              width: `${size - 6}px`,
            }}
          />
        ) : (
          <Hash
            className={`p-0 text-xl ${
              isSelected && !textPrimary ? 'text-userDark' : 'text-neutral'
            } ${textPrimary && 'text-userDark'}`}
            style={{
              height: `${size - 5}px`,
              width: `${size - 5}px`,
            }}
          />
        )
      }
    />

    {userId && (
      <div className="rounded-full absolute -bottom-1.5 -right-1.5 w-4 h-4 flex justify-center items-center">
        <OnlineStatusIndicator userId={userId} />
      </div>
    )}
  </Avatar>
);

export default ChannelIcon;
