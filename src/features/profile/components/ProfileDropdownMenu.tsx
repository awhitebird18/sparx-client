import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { MouseEvent, useState } from 'react';
import { Camera, Person, ThreeDotsVertical } from 'react-bootstrap-icons';

const ProfileDropdownMenu = observer(() => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useStore('userStore');
  const { setActiveModal } = useStore('modalStore');

  const openUserDetailsModal = () => {
    setDropdownOpen(false);
    setActiveModal({
      type: 'UserDetails',
      payload: { userId: currentUser?.uuid },
    });
  };

  const handleClickUploadImageButton = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    setDropdownOpen(false);
  };

  return (
    <div className="z-50 self-start">
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="w-9 h-9 p-2" variant="outline">
            <ThreeDotsVertical size={20} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="p-1">
          <DropdownMenuItem
            onClick={(e) => handleClickUploadImageButton(e)}
            className="flex items-center gap-3 h-8 px-4 hover:bg-card-hover"
          >
            <Camera />
            Upload profile picture
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={openUserDetailsModal}
            className="flex items-center gap-3 h-8 px-4 hover:bg-card-hover"
          >
            <Person />
            Update profile
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

export default ProfileDropdownMenu;
