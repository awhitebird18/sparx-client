import { Button } from '@/components/ui/Button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import OnlineStatusIndicator from '@/features/users/components/OnlineStatusIndicator';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import { User } from '@/features/users/types';

type Props = {
  user: User;
  handleViewUserProfile: () => void;
};

const UserDetails = ({ user, handleViewUserProfile }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <UserAvatar size={38} userId={user.uuid} profileImage={user.profileImage} />
      </HoverCardTrigger>
      <HoverCardContent align="start" side="top" className="flex flex-col gap-4 w-fit max-w-72 p-4">
        <div className="flex gap-3">
          <UserAvatar size={80} userId={user.uuid} profileImage={user.profileImage} />
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <Username firstName={user.firstName} lastName={user.lastName} />
              <OnlineStatusIndicator userId={user.uuid} />
            </div>
            <p className="text-muted">Software Developer</p>
          </div>
        </div>
        <Button className="w-full" variant="outline-primary" onClick={handleViewUserProfile}>
          View Profile
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserDetails;
