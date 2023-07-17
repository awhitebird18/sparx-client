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
import { useStore } from '@/stores/RootStore';
import { useRef, useState } from 'react';
import { ModalName } from '@/components/modal/modalList';

interface ListHeaderProps {
  id: string;
  icon?: JSX.Element;
  title: string;
  isSystem?: boolean;
}

const ListHeader = ({ id, icon, title, isSystem }: ListHeaderProps) => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);

  const handleClickItem = ({
    type,
    payload,
  }: {
    type: ModalName;
    payload?: { id: string; name: string };
  }) => {
    setActiveModal({ type, payload });
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <div className="h-8 w-100 flex items-center gap-2 px-2 hover:bg-hover cursor-pointer rounded-sm overflow-hidden mx-2">
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">{icon}</div>
        <DropdownMenuTrigger asChild>
          <div className="font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
            {title}
          </div>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent
        className="DropdownMenuContent w-60"
        sideOffset={5}
        align="start"
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
              <DropdownMenuItem onClick={() => handleClickItem({ type: 'CreateChannelModal' })}>
                Create Channel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleClickItem({ type: 'CreateSectionModal' })}>
                Create Section
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Manage</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {!isSystem && (
                <>
                  <DropdownMenuItem
                    onClick={() =>
                      handleClickItem({ type: 'CreateSectionModal', payload: { id, name: title } })
                    }
                  >
                    {`Rename ${title}`}
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-rose-500"
                    onClick={() =>
                      handleClickItem({ type: 'DeleteSectionModal', payload: { id, name: title } })
                    }
                  >{`Delete ${title}`}</DropdownMenuItem>

                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem>Manage Sections</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListHeader;
