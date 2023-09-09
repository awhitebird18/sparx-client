import { Hash } from 'react-bootstrap-icons';
import { API_URL } from '@/config/api';

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

const ChannelIcon = ({ size = 40, imageUrl, isSelected, textPrimary, userId }: UserAvatarProps) => (
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
      className={`h-full flex-1 w-full rounded-sm overflow-hidden bg-transparent dark:bg-transparent p-0 text-xl ${
        isSelected && !textPrimary ? 'text-primary-darkest bg-transparent' : 'text-main'
      } ${textPrimary && 'text-main'}`}
      children={
        <Hash
          style={{
            height: `${size - 5}px`,
            width: `${size - 5}px`,
          }}
        />
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
