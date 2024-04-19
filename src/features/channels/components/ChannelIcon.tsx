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

const ChannelIcon = ({ size = 50, imageUrl, isSelected, textPrimary, userId }: UserAvatarProps) => {
  return (
    <Avatar className="relative h-9 w-9">
      <AvatarImage src={imageUrl} className={`rounded-${size > 30 ? 'lg' : 'sm'} w-full h-full`} />
      <AvatarFallback
        className={`h-9 w-9 flex-1 rounded-sm overflow-hidden bg-transparent dark:bg-transparent p-0 text-xl ${
          isSelected && !textPrimary ? 'text-primary-darkest bg-transparent' : 'text-main'
        } ${textPrimary && 'text-main'}`}
      />

      {userId && (
        <div className="rounded-full absolute -bottom-1.5 -right-1.5 w-4 h-4 flex justify-center items-center">
          <OnlineStatusIndicator userId={userId} />
        </div>
      )}
    </Avatar>
  );
};

export default ChannelIcon;
