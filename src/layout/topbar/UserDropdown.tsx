import { useAuth } from '@/providers/contexts/useAuth';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import { useState } from 'react';
import { ModalName } from '@/layout/modal/modalList';
import { useStore } from '@/stores/RootStore';
import UserAvatar from '@/features/users/components/UserAvatar';
import { observer } from 'mobx-react-lite';
import Username from '@/features/users/components/Username';
import { UserStatus } from '@/features/users/enums';
import OnlineStatusIndicator from '@/features/users/components/OnlineStatusIndicator';
import SetUserStatusButton from '@/features/userStatus/components/UserStatusButton';
import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';
import { ArrowReturnRight, Cup, Eye, Gear, Pencil } from 'react-bootstrap-icons';

const UserDropdown: React.FC = observer(() => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userLogout } = useAuth();
  const { currentUser, setUserOnlineStatus, userOnlineStatus } = useStore('userStore');
  const { emitSocket } = useStore('socketStore');
  const { currentWorkspace } = useStore('workspaceStore');
  const { toggleMainPanel } = useStore('mainPanelStore');

  const handleOpenModal = ({ type, payload }: { type: ModalName; payload?: unknown }) => {
    setDropdownOpen(false);
    setActiveModal({ type, payload });
  };

  const handleSetOnlineStatus = (userStatus: UserStatus) => {
    setUserOnlineStatus(userStatus);
    emitSocket('change-status', { status: userStatus });
  };

  if (!currentUser) return;

  const transformedImage = transformCloudinaryUrl(currentUser.profileImage, 60, 60);

  const handleViewUserProfile = async (userId: string) => {
    toggleMainPanel({ type: 'profile', payload: { userId } });
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <div className="flex items-center bg-card rounded-lg border-border border">
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger className="flex items-center">
              <UserAvatar
                size={34.5}
                userId={currentUser.uuid}
                profileImage={transformedImage}
                showStatus
              />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent asChild align="end" sideOffset={10}>
            {(() => {
              const formattedName = `${currentUser.firstName
                .charAt(0)
                .toUpperCase()}${currentUser.firstName
                .substring(1)
                .toLowerCase()} ${currentUser.lastName
                .charAt(0)
                .toUpperCase()}${currentUser.lastName.substring(1).toLowerCase()}`;

              return (
                <p className="text-ellipsis whitespace-nowrap overflow-hidden font-medium">
                  {formattedName}
                </p>
              );
            })()}
          </TooltipContent>
        </Tooltip>
      </div>

      <DropdownMenuContent align="end" sideOffset={5} className=" w-80 p-4 space-y-4">
        <div className="flex gap-2 overflow-hidden">
          <UserAvatar size={50} userId={currentUser.uuid} profileImage={transformedImage} />
          <div style={{ height: '40px' }} className="flex flex-col justify-between w-full">
            <div className="w-full">
              <Username firstName={currentUser.firstName} lastName={currentUser.lastName} />
            </div>
            <div className="flex items-center gap-1">
              <OnlineStatusIndicator userId={currentUser.uuid} />
              <p className="text-sm text-secondary h-3 leading-3">
                {`${userOnlineStatus[0].toUpperCase()}${userOnlineStatus.substring(1)}`}
              </p>
            </div>
          </div>
        </div>

        <div onClick={() => handleOpenModal({ type: 'UserStatusModal' })}>
          <SetUserStatusButton />
        </div>
        <div>
          <DropdownMenuSeparator className="DropdownMenuSeparator dark:bg-slate-500/40 my-1" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => handleViewUserProfile(currentUser.uuid)}
              className="flex items-center gap-4 h-9 px-3 hover:bg-hover card"
            >
              <Pencil />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleOpenModal({ type: 'PreferencesModal' })}
              className="flex items-center gap-4 h-9 px-3 hover:bg-hover card"
            >
              <Gear /> Account settings
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() =>
                handleSetOnlineStatus(
                  userOnlineStatus === UserStatus.ONLINE ? UserStatus.AWAY : UserStatus.ONLINE,
                )
              }
              className="flex items-center gap-4 h-9 px-3 hover:bg-hover card"
            >
              <Cup />
              {`Set yourself ${userOnlineStatus === UserStatus.ONLINE ? 'as away' : 'online'}`}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuItem
            onClick={() => handleOpenModal({ type: 'ChangePasswordModal' })}
            className="flex items-center gap-4 h-9 px-3 hover:bg-hover card"
          >
            <Eye /> Change password
          </DropdownMenuItem>

          <DropdownMenuSeparator className="DropdownMenuSeparator dark:bg-slate-500/40 my-2" />
          <DropdownMenuItem
            onClick={userLogout}
            className="flex items-center gap-4 h-9 px-3 hover:bg-hover card truncate"
          >
            <ArrowReturnRight className="mt-0.5" /> {`Sign out of ${currentWorkspace?.name}`}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default UserDropdown;
