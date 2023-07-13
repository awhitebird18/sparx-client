import { useAuth } from '@/providers/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
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

const UserDropdown: React.FC = () => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTriggerRef = useRef(null);
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
              <Avatar className="w-8 h-8 cursor-pointer" ref={dropdownTriggerRef}>
                {<AvatarImage src={currentUser.image} />}
                <AvatarFallback
                  children={currentUser.firstName.substring(0, 2).toLowerCase()}
                  className="rounded-md"
                />
              </Avatar>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>{currentUser.firstName}</TooltipContent>
        </Tooltip>
      )}

      <DropdownMenuContent
        className="DropdownMenuContent w-56"
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <div className="w-full p-2 flex gap-2 mb-2">
          <Avatar className="w-10 h-10 " ref={dropdownTriggerRef}>
            {<AvatarImage src={currentUser?.image} />}
            <AvatarFallback
              children={currentUser?.firstName.substring(0, 2).toLowerCase()}
              className="rounded-md"
            />
          </Avatar>
          <div>
            <p>{currentUser?.firstName}</p>
            <div className="flex items-center gap-1">
              <div className="rounded-full bg-gray-600 h-2.5 w-2.5"></div>
              <p className="text-xs text-gray-400">Away</p>
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

export default UserDropdown;
