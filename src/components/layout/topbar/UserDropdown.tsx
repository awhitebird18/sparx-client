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
import { ArrowReturnRight, Cup, EmojiSmile, Eye, Gear, Pencil } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const UserDropdown: React.FC = () => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);
  const { userLogout } = useAuth();
  const { currentUser, setUserOnlineStatus, userOnlineStatus } = useStore('userStore');
  const { emitSocket } = useStore('socketStore');
  const { activeUserStatus } = useStore('userStatusStore');
  const { currentWorkspace } = useStore('workspaceStore');

  const handleOpenModal = ({ type, payload }: { type: ModalName; payload?: unknown }) => {
    setDropdownOpen(false);
    setActiveModal({ type, payload });
  };

  const handleSetOnlineStatus = (userStatus: UserStatus) => {
    setUserOnlineStatus(userStatus);
    emitSocket('change-status', { status: userStatus });
  };

  const handleViewProfile = () => {
    navigate(`/app/profile/${currentUser?.uuid}`);
  };

  if (!currentUser) return;

  const transformedImage = transformCloudinaryUrl(currentUser.profileImage, 60, 60);

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <div className="flex items-center bg-card rounded-lg border-border border">
        <div
          onClick={() => handleOpenModal({ type: 'UserStatusModal' })}
          className="w-8 h-8 mr-1 flex items-center justify-center"
        >
          {activeUserStatus ? (
            <UserStatusDisplay status={activeUserStatus} />
          ) : (
            <div className="w-full h-full flex items-center justify-center cursor-pointer ">
              <EmojiSmile className="thick-icon" />
            </div>
          )}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger className="flex items-center">
              <UserAvatar
                size={31.5}
                userId={currentUser.uuid}
                profileImage={transformedImage}
                showStatus
              />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent asChild align="end">
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

      <DropdownMenuContent
        align="end"
        sideOffset={5}
        className=" w-80 p-4 space-y-4"
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
              onClick={handleViewProfile}
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
          {/* <DropdownMenuSeparator className="DropdownMenuSeparator" /> */}
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
            {/* <DropdownMenuItem
              disabled
              onClick={() => console.info('pauseNotifications')}
              className="flex items-center gap-4 h-9 px-3 hover:bg-hover card"
            >
              <Bell /> Pause notifications
            </DropdownMenuItem> */}
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
};

export default observer(UserDropdown);
