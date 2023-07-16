import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { PersonFill } from 'react-bootstrap-icons';

type UserAvatarProps = { size?: number; showStatus?: boolean };

const UserAvatar = ({ size = 10, showStatus }: UserAvatarProps) => {
  return (
    <Avatar className={`h-${size} w-${size} relative overflow-visible`}>
      <AvatarImage src="/" className="h-full w-full" />
      <AvatarFallback
        className=" h-full w-full rounded-sm border border-border"
        children={<PersonFill className="text-5xl mt-3 text-indigo-500" />}
      />

      {showStatus && (
        <div className="rounded-full absolute -bottom-2 -right-2 bg-background w-4 h-4 flex justify-center items-center">
          <div className="rounded-full w-2.5 h-2.5 bg-teal-500"></div>
        </div>
      )}
    </Avatar>
  );
};

export default UserAvatar;
