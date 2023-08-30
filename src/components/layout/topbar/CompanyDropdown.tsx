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
import { ModalName } from '@/components/modal/modalList';
import { useStore } from '@/stores/RootStore';

const CompanyDropdown = () => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);
  const { userLogout } = useAuth();

  const handleOpenModal = ({ type }: { type: ModalName }) => {
    setActiveModal({ type, payload: {} });
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger>
        <div className="flex gap-1.5 hover:bg-transparent mx-4 h-14 cursor-pointer items-center border-b border-border">
          <Logo size={7} />
          <div className="flex items-center gap-1 flex-1 justify-between">
            <h1 className="font-bold flex-grow-1 whitespace-nowrap text-2xl">SPARX</h1>
            <ChevronDown size={17} className="mt-0.5 ml-2 opacity-75" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="start"
        alignOffset={10}
        sideOffset={0}
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
            Invite people to Sparx
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
          <DropdownMenuSeparator className="DropdownMenuSeparator" />
          <DropdownMenuItem onClick={userLogout}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompanyDropdown;
