import { useRef, useState } from 'react';
import {
  ArrowReturnRight,
  ArrowsMove,
  Check,
  ChevronDown,
  Gear,
  People,
  Plus,
  QuestionCircle,
} from 'react-bootstrap-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { ModalName } from '@/components/modal/modalList';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Workspace } from '@/features/workspaces/types/workspace';
import workspaceNight from '@/assets/images/lgoo.png';
import workspaceDay from '@/assets/images/workspaceDay.png';

const CompanyDropdown = () => {
  const { setActiveModal } = useStore('modalStore');
  const { workspaces, switchWorkspaceApi, currentWorkspace } = useStore('workspaceStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { sidebarOpen } = useStore('sidebarStore');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);

  const handleOpenModal = ({ type }: { type: ModalName }) => {
    setActiveModal({ type, payload: {} });
    setDropdownOpen(false);
  };

  const handleCreateWorkspace = () => {
    setActiveModal({ type: 'CreateWorkspaceModal', payload: null });
    setDropdownOpen(false);
  };

  const handleUpdateWorkspace = () => {
    setActiveModal({
      type: 'UpdateWorkspaceModal',
      payload: null,
    });
    setDropdownOpen(false);
  };

  const handleLeaveWorkspace = () => {
    setActiveModal({
      type: 'LeaveWorkspaceModal',
      payload: null,
    });
    setDropdownOpen(false);
  };

  function getCurrentWorkspaceImage() {
    const hour = new Date().getHours(); // Gets the current hour (0-23)
    const isDaytime = hour > 6 && hour < 18; // Define day time (e.g., 6 AM to 6 PM)

    if (isDaytime) {
      return workspaceDay; // Return the day image if it's day time
    } else {
      return workspaceNight; // Return the night image if it's night time
    }
  }

  const workspacesToDisplay = workspaces
    .filter((workspace: Workspace) => workspace.uuid !== currentWorkspace?.uuid)
    .map((workspace: Workspace) => {
      return (
        <DropdownMenuItem
          key={workspace.uuid}
          onClick={() => switchWorkspaceApi(workspace.uuid)}
          className="flex items-center gap-4 h-9 px-3 hover:bg-card-foreground"
        >
          <img
            src={workspace.imgUrl ?? getCurrentWorkspaceImage()}
            className="w-5 h-5 rounded bg-primary"
          />
          <div className="flex items-center gap-4 justify-between flex-1">
            {workspace.name}
            {workspace.uuid === currentWorkspace?.uuid ? (
              <Check size={24} className="text-primary" />
            ) : (
              <div />
            )}
          </div>
        </DropdownMenuItem>
      );
    });

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger className="overflow-hidden flex-shrink-0 flex flex-1 items-center gap-3 w-full">
        <div className="w-9 h-9 flex-shrink-0 rounded-md border border-border  bg-primary">
          <img
            src={currentWorkspace?.imgUrl ?? getCurrentWorkspaceImage()}
            className="w-full h-full flex-shrink-0"
          />
        </div>

        {sidebarOpen && (
          <div className="flex items-center gap-1 text-lg truncate pr-4">
            <span className="text-lg font-semibold tracking leading-tight truncate w-full">
              {currentWorkspace?.name}
            </span>
            <ChevronDown size={14} className="flex-shrink-0 mt-0.5" />
          </div>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-72 space-y-2"
        align="start"
        alignOffset={15}
        sideOffset={0}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        {workspacesToDisplay.length ? (
          <>
            <DropdownMenuGroup>{workspacesToDisplay}</DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        ) : null}

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleOpenModal({ type: 'InviteUserModal' })}
            className="flex items-center gap-4 h-9 px-3 hover:bg-card-foreground"
          >
            <People className="w-5 h-5 p-0.5" /> Invite people
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleUpdateWorkspace}
            className="flex items-center gap-4 h-9 px-3 hover:bg-card-foreground"
          >
            <Gear className="w-5 h-5 p-0.5" /> Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex items-center gap-4 h-9 px-3 hover:bg-card-foreground"
            onClick={() => {
              console.info('support');
            }}
            disabled
          >
            <QuestionCircle className="w-5 h-5 p-0.5" /> Support
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-4 h-9 px-3 hover:bg-card-foreground"
            onClick={() => {
              console.info('feedback');
            }}
            disabled
          >
            <ArrowsMove className="w-5 h-5 p-0.5" /> Feedback
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleCreateWorkspace}
            className="flex items-center gap-4 h-9 px-3 hover:bg-card-foreground"
          >
            <Plus className="w-5 h-5" /> Create a new workspace
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLeaveWorkspace}
            className="flex items-center gap-4 h-9 px-3 hover:bg-card-foreground text-rose-500 truncate"
          >
            <div className="w-5 h-5">
              <ArrowReturnRight className="flex-shrink-0 ml-1 mt-0.5" />
            </div>
            {`Leave ${currentWorkspace?.name}`}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default observer(CompanyDropdown);
