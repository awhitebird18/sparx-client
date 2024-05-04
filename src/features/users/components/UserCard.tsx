import { Card, CardContent } from '@/components/ui/Card';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Badge } from '@/components/ui/Badge';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import useUserActions from '../hooks/useUserActions';
import { useStore } from '@/stores/RootStore';
import { ChannelSubscription } from '@/features/channels/types';
import { observer } from 'mobx-react-lite';

type Props = {
  userChannel: ChannelSubscription;
};

const UserCard = observer(({ userChannel }: Props) => {
  const { handleViewUserProfile, handleSetAdmin, handleRemoveFromWorkspace } = useUserActions();
  const { findUserByUuid } = useStore('userStore');
  const user = findUserByUuid(userChannel.userId);

  if (!user) return;

  return (
    <Card
      key={user.uuid}
      className="card-base hover:bg-hover dark:hover:bg-hover p-3 relative cursor-pointer shadow-none"
      onClick={() => {
        handleViewUserProfile(user.uuid);
      }}
    >
      <CardContent className="flex gap-5 p-1">
        <div className="flex flex-col gap-2">
          <UserAvatar
            size={44}
            userId={user.uuid}
            profileImage={user.profileImage}
            showStatus
            color={user.preferences.primaryColor}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex text-main gap-3 items-center">
            <Username firstName={user.firstName} lastName={user.lastName} />
            {user.isAdmin && <Badge className="text-xs p-1 px-2 h-5 rounded-lg">Admin</Badge>}
          </div>

          <p className="text-sm text-secondary text-ellipsis overflow-hidden whitespace-nowrap mb-1">
            Software Engineer
          </p>
          <p
            className={`text-sm ${
              userChannel.status === CompletionStatus.Complete
                ? 'text-yellow-400'
                : 'text-violet-500'
            }`}
          >
            {userChannel.status}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ThreeDotsVertical size={18} className="text-secondary absolute top-4 right-3" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-50" align="end" alignOffset={-10}>
            <DropdownMenuItem
              onClick={() => {
                handleViewUserProfile(user.uuid);
              }}
            >
              View profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetAdmin(user.uuid, !user.isAdmin);
              }}
            >
              {user.isAdmin ? 'Set as member' : 'Set as admin'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleRemoveFromWorkspace(user.uuid);
              }}
              className="text-rose-500"
            >
              Remove from workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
});

export default UserCard;
