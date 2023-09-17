import { useRef, useState } from 'react';
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
import { ChannelType } from '@/features/channels/enums';
import { observer } from 'mobx-react-lite';

const CompanyDropdown = () => {
  const { setActiveModal } = useStore('modalStore');
  const { findSectionByChannelType } = useStore('sectionStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);
  const { userLogout } = useAuth();

  const handleOpenModal = ({ type }: { type: ModalName }) => {
    setActiveModal({ type, payload: {} });
  };

  const handleCreateChannel = () => {
    const section = findSectionByChannelType(ChannelType.CHANNEL);
    if (!section) return;
    setActiveModal({ type: 'CreateChannelModal', payload: { id: section.uuid } });
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger className="w-full">
        <div className="flex gap-1.5 hover:bg-transparent px-4 pl-6 h-14 cursor-pointer items-center border-b border-border">
          <h1 className="flex-grow-1 whitespace-nowrap text-lg font-bold">Personal Workspace</h1>
          <ChevronDown size={13} className="mt-1" />
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
          <DropdownMenuItem onClick={handleCreateChannel}>Create Channel</DropdownMenuItem>
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
            disabled
          >
            Support
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              console.info('feedback');
            }}
            disabled
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

export default observer(CompanyDropdown);
