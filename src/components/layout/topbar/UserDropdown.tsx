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

const UserDropdown: React.FC = () => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);
  const { currentUser, logout } = useAuth();

  const handleOpenModal = ({ type }: { type: ModalName }) => {
    setActiveModal({ type, payload: {} });
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      {currentUser && (
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenuTrigger className="flex items-center" asChild>
              <div>
                <UserAvatar size={9} showStatus />
              </div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>{currentUser.firstName}</TooltipContent>
        </Tooltip>
      )}

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
        <div className="w-full p-2 flex gap-2 mb-1">
          <UserAvatar size={11} />
          <div>
            <p>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
            <div className="flex items-center gap-1">
              <div className="rounded-full bg-green-600 h-2.5 w-2.5"></div>
              <p className="text-sm text-secondary-foreground">Online</p>
            </div>
          </div>
        </div>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => console.info('changeStatus')}>
            Set yourself as away
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.info('pauseNotifications')}>
            Pause notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="DropdownMenuSeparator" />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleOpenModal({ type: 'ProfileModal' })}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenModal({ type: 'PreferencesModal' })}>
            Preferences
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="DropdownMenuSeparator" />
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default observer(UserDropdown);
