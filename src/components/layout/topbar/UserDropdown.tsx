import { useAuth } from '@/providers/auth';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import { useRef, useState } from 'react';
import { ModalName } from '@/components/modal/modalList';
import { useStore } from '@/stores/RootStore';
import UserAvatar from '@/features/users/components/UserAvatar';
import { observer } from 'mobx-react-lite';
import Username from '@/features/users/components/Username';
import { UserStatus } from '@/features/users/enums';
import OnlineStatusIndicator from '@/features/users/components/OnlineStatusIndicator';
import SetUserStatusButton from '@/features/userStatus/components/UserStatusButton';
import UserStatusDisplay from '@/features/userStatus/components/UserStatusDisplay';
import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';

const UserDropdown: React.FC = () => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);
  const { userLogout } = useAuth();
  const { currentUser, setUserOnlineStatus, userOnlineStatus } = useStore('userStore');
  const { emitSocket } = useStore('socketStore');
  const { activeUserStatus } = useStore('userStatusStore');

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

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <Tooltip>
        <div className="gap-1 flex items-center">
          {activeUserStatus && (
            <div onClick={() => handleOpenModal({ type: 'UserStatusModal' })}>
              <UserStatusDisplay status={activeUserStatus} />
            </div>
          )}
          <TooltipTrigger asChild>
            <DropdownMenuTrigger className="flex items-center">
              <UserAvatar
                size={31}
                userId={currentUser.uuid}
                profileImage={transformedImage}
                showStatus
              />
            </DropdownMenuTrigger>
          </TooltipTrigger>
        </div>
        <TooltipContent>
          <Username firstName={currentUser.firstName} lastName={currentUser.lastName} />
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align="end"
        sideOffset={5}
        className="DropdownMenuContent w-80 p-4 space-y-4"
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <div className="flex gap-2 overflow-hidden">
          <UserAvatar size={50} userId={currentUser.uuid} profileImage={transformedImage} />
          <div style={{ height: '40px' }} className="flex flex-col justify-between w-full">
            <div className="w-full">
              <Username firstName={currentUser.firstName} lastName={currentUser.lastName} />
            </div>
            <div className="flex items-center gap-1">
              <OnlineStatusIndicator userId={currentUser.uuid} />
              <p className="text-sm text-secondary-foreground h-3 leading-3">
                {`${userOnlineStatus[0].toUpperCase()}${userOnlineStatus.substring(1)}`}
              </p>
            </div>
          </div>
        </div>

        <div onClick={() => handleOpenModal({ type: 'UserStatusModal' })}>
          <SetUserStatusButton />
        </div>
        <div>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() =>
                handleSetOnlineStatus(
                  userOnlineStatus === UserStatus.ONLINE ? UserStatus.AWAY : UserStatus.ONLINE,
                )
              }
            >
              {`Set yourself ${userOnlineStatus === UserStatus.ONLINE ? 'as away' : 'online'}`}
            </DropdownMenuItem>
            <DropdownMenuItem disabled onClick={() => console.info('pauseNotifications')}>
              Pause notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="DropdownMenuSeparator" />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() =>
                handleOpenModal({ type: 'ProfileModal', payload: { userId: currentUser?.uuid } })
              }
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenModal({ type: 'PreferencesModal' })}>
              Preferences
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenModal({ type: 'ChangePasswordModal' })}>
              Change password
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="DropdownMenuSeparator" />
          <DropdownMenuItem onClick={userLogout}>Logout</DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default observer(UserDropdown);
