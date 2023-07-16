import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { PersonFill } from 'react-bootstrap-icons';

type UserAvatarProps = { size?: number };

const UserAvatar = ({ size = 10 }: UserAvatarProps) => {
  return (
    <Avatar className={`h-${size} w-${size} overflow-hidden`}>
      <AvatarImage src="/" className="h-full w-full" />
      <AvatarFallback
        className=" h-full w-full rounded-sm border border-border"
        children={<PersonFill className="text-5xl mt-3 text-indigo-500" />}
      />
    </Avatar>
  );
};

export default UserAvatar;
