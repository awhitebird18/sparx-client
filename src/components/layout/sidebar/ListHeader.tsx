import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useStore } from '@/stores/stores';
import { useRef, useState } from 'react';
import { ModalName } from '@/components/modal/modalList';

interface ListHeaderProps {
  uuid: string;
  icon?: JSX.Element;
  title: string;
}

const ListHeader = ({ uuid, icon, title }: ListHeaderProps) => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);

  const handleClickItem = ({ name }: { name: ModalName }) => {
    setActiveModal({ name });
    console.log(uuid);
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <div className="h-7 m-1 w-100 flex items-center gap-2 px-2 hover:bg-hover cursor-pointer rounded-sm overflow-hidden">
        <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
        <DropdownMenuTrigger asChild>
          <div className="font-semibold">{title}</div>
        </DropdownMenuTrigger>
      </div>
      <div className="relative">
        <DropdownMenuContent
          className="DropdownMenuContent w-60"
          sideOffset={5}
          align="start"
          alignOffset={-40}
          hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus();
              focusRef.current = null;
              event.preventDefault();
            }
          }}
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Create</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleClickItem({ name: 'CreateChannelModal' })}>
                  Create Channel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleClickItem({ name: 'CreateSectionModal' })}>
                  Create Section
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Manage</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Rename Section</DropdownMenuItem>
                <DropdownMenuItem>Delete Section</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Manage Sections</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

export default ListHeader;
