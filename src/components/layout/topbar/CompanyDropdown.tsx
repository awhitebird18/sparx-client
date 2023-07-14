import { useRef, useState } from 'react';
import Logo from '@/components/logo/Logo';

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
import { useStore } from '@/stores/RootStore';

const CompanyDropdown = () => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTriggerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);
  const { logout } = useAuth();

  const handleOpenModal = ({ type }: { type: ModalName }) => {
    setActiveModal({ type, payload: {} });
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className="flex gap-3 hover:bg-transparent px-0 cursor-pointer"
          ref={dropdownTriggerRef}
        >
          <Logo size={8} />
          <div className="flex items-center gap-1">
            <h1 className="font-bold flex-grow-1 whitespace-nowrap text-xl">Chat App</h1>
            <ChevronDown size={13} className="mt-1 opacity-75" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="DropdownMenuContent w-60"
        align="start"
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleOpenModal({ type: 'CreateChannelModal' })}>
            Create Channel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleOpenModal({ type: 'InviteUserModal' })}>
            Invite people to ChatApp
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="DropdownMenuSeparator" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              console.info('support');
            }}
          >
            Support
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              console.info('feedback');
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
