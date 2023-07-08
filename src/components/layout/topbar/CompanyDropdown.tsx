import { useRef, useState } from 'react';
import Logo from '@/components/logo/Logo';
import { Button } from '@/components/ui/Button';
import { ChevronDown } from 'react-bootstrap-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useAuth } from '@/providers/auth';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import { ModalName } from '@/components/modal/modalList';
import { useStore } from '@/stores/stores';

const CompanyDropdown = () => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTriggerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);
  const { logout } = useAuth();

  const handleOpenModal = ({ name }: { name: ModalName }) => {
    setActiveModal({ name });
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex gap-3 hover:bg-transparent px-0"
          variant="ghost"
          ref={dropdownTriggerRef}
        >
          <Logo size={7} />
          <div className="flex items-center gap-1">
            <h1 className="font-bold flex-grow-1 whitespace-nowrap text-xl">Chat App</h1>
            <ChevronDown size={13} className="mt-1 opacity-75" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="DropdownMenuContent w-60"
        sideOffset={5}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleOpenModal({ name: 'CreateChannelModal' })}>
            Create Channel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenModal({ name: 'InviteUserModal' })}>
            Invite people to ChatApp
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="DropdownMenuSeparator" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              console.log('support');
            }}
          >
            Support
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              console.log('feedback');
            }}
          >
            Feedback
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Sign out of ChatApp</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuArrow className="DropdownMenuArrow" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompanyDropdown;
