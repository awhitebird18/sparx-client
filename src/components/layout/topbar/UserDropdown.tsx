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

const UserDropdown: React.FC = () => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);
  const { userLogout } = useAuth();
  const { currentUser, setUserOnlineStatus, userOnlineStatus } = useStore('userStore');
  const { emitSocket } = useStore('socketStore');

  const handleOpenModal = ({ type, payload }: { type: ModalName; payload?: unknown }) => {
    setActiveModal({ type, payload });
  };

  const handleSetOnlineStatus = (userStatus: UserStatus) => {
    setUserOnlineStatus(userStatus);
    emitSocket('change-status', { status: userStatus });
  };

  if (!currentUser) return;

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger className="flex items-center" asChild>
            <div>
              <UserAvatar
                size={30}
                userId={currentUser.uuid}
                profileImage={currentUser.profileImage}
                showStatus
              />
            </div>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <Username firstName={currentUser.firstName} lastName={currentUser.lastName} />
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align="end"
        sideOffset={5}
        className="DropdownMenuContent w-60"
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <div className="w-full p-2 flex gap-2 mb-1 overflow-hidden">
          <UserAvatar size={40} userId={currentUser.uuid} profileImage={currentUser.profileImage} />
          <div style={{ height: '40px' }} className="flex flex-col justify-between w-full">
            <div className="w-full">
              <Username firstName={currentUser.firstName} lastName={currentUser.lastName} />
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <OnlineStatusIndicator userId={currentUser.uuid} />
              <p className="text-sm text-secondary-foreground h-3 leading-3 mb-0.5">
                {`${userOnlineStatus[0].toUpperCase()}${userOnlineStatus.substring(1)}`}
              </p>
            </div>
          </div>
        </div>
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
          <DropdownMenuItem onClick={() => console.info('pauseNotifications')}>
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
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="DropdownMenuSeparator" />
        <DropdownMenuItem onClick={userLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default observer(UserDropdown);
