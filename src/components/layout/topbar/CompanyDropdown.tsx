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
import CreateChannelForm from '@/features/channels/components/CreateChannelForm';
import { DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import InviteUserForm from '@/features/users/components/InviteUserForm';
import { DropdownDialogItem } from '@/components/ui/DropdownDialogItem';

const CompanyDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const dropdownTriggerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);
  const { logout } = useAuth();

  const handleClickItem = (uuid: string) => {
    console.log(uuid);
  };

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current;
  }

  function handleDialogItemOpenChange(open: boolean) {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }

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
        hidden={hasOpenDialog}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <DropdownMenuGroup>
          <DropdownDialogItem
            triggerChildren="Create a channel"
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <DialogTitle className="DialogTitle">Create a channel</DialogTitle>
            <DialogDescription className="DialogDescription">
              Channels are a way for teams to openly collaborate. Create a channel around a topic
              and people can join or follow the conversation.
            </DialogDescription>
            <CreateChannelForm />
          </DropdownDialogItem>

          <DropdownDialogItem
            triggerChildren="Invite people to ChatApp"
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <DialogTitle className="DialogTitle">Invite people to ChatApp</DialogTitle>
            <DialogDescription className="DialogDescription">Send invite to:</DialogDescription>
            <InviteUserForm />
          </DropdownDialogItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="DropdownMenuSeparator" />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleClickItem('support')}>Support</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClickItem('feedback')}>Feedback</DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Sign out of ChatApp</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuArrow className="DropdownMenuArrow" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompanyDropdown;
