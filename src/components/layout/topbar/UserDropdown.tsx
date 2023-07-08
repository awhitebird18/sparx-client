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
import { useStore } from '@/stores/stores';

const UserDropdown: React.FC = () => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTriggerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);
  const { currentUser, logout } = useAuth();

  const handleOpenModal = ({ name }: { name: ModalName }) => {
    setActiveModal({ name });
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger className="flex items-center">
        {currentUser && (
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="w-8 h-8 cursor-pointer" ref={dropdownTriggerRef}>
                {<AvatarImage src={currentUser.image} />}
                <AvatarFallback
                  children={currentUser.firstName.substring(0, 2).toLowerCase()}
                  className="rounded-md"
                />
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>{currentUser.firstName}</TooltipContent>
          </Tooltip>
        )}
      </DropdownMenuTrigger>

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
              children={currentUser.firstName.substring(0, 2).toLowerCase()}
              className="rounded-md"
            />
          </Avatar>
          <div>
            <p>{currentUser.firstName}</p>
            <div className="flex items-center gap-1">
              <div className="rounded-full bg-gray-600 h-2.5 w-2.5"></div>
              <p className="text-xs text-gray-400">Away</p>
            </div>
          </div>
        </div>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => console.log('changeStatus')}>
            Set yourself as away
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('pauseNotifications')}>
            Pause notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="DropdownMenuSeparator" />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleOpenModal({ name: 'ProfileModal' })}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenModal({ name: 'PreferencesModal' })}>
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
