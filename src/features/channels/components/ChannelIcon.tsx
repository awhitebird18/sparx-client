import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Hash, Lock } from 'react-bootstrap-icons';
import { API_URL } from '@/config';

type UserAvatarProps = {
  size?: number;
  showStatus?: boolean;
  imageUrl?: string;
  isSelected?: boolean | undefined;
  isPrivate?: boolean | undefined;
};

const ChannelIcon = ({
  size = 40,
  showStatus,
  imageUrl,
  isSelected,
  isPrivate,
}: UserAvatarProps) => (
  <Avatar className="relative overflow-visible" style={{ height: `${size}px`, width: `${size}px` }}>
    <AvatarImage
      src={`${API_URL}${imageUrl}`}
      style={{ height: `${size}px`, width: `${size}px` }}
      className="rounded-sm"
    />
    <AvatarFallback
      className={`h-full flex-1 w-full rounded-sm overflow-hidden bg-transparent dark:bg-transparent`}
      children={
        isPrivate ? (
          <Lock
            className={`p-0 text-xl ${isSelected ? 'text-white' : 'text-muted-foreground'}`}
            style={{
              height: `${size}px`,
              width: `${size}px`,
            }}
          />
        ) : (
          <Hash
            className={`p-0 text-xl ${isSelected ? 'text-white' : 'text-muted-foreground'}`}
            style={{
              height: `${size}px`,
              width: `${size}px`,
            }}
          />
        )
      }
    />

    {showStatus && (
      <div className="rounded-full absolute -bottom-1.5 -right-1.5 w-4 h-4 flex justify-center items-center">
        <div className="rounded-full w-2.5 h-2.5 bg-teal-500"></div>
      </div>
    )}
  </Avatar>
);

export default ChannelIcon;
