import { useState } from 'react';
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
import { ModalName } from '@/layout/modal/modalList';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Workspace } from '@/features/workspaces/types/workspace';
import workspaceNight from '@/assets/images/workspaceNight.png';
import workspaceDay from '@/assets/images/workspaceDay.png';

const CompanyDropdown = observer(() => {
  const { setActiveModal } = useStore('modalStore');
  const { workspaces, switchWorkspaceApi, currentWorkspace } = useStore('workspaceStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    const hour = new Date().getHours();
    const isDaytime = hour > 6 && hour < 18;

    if (isDaytime) {
      return workspaceDay;
    } else {
      return workspaceNight;
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
      <DropdownMenuTrigger className="card-base top-2 left-2 fixed px-1.5 flex-shrink-0 flex flex-1 items-center gap-3 w-fit h-12 z-30">
        <div className=" flex-shrink-0 rounded-md overflow-hidden border border-border bg-primary">
          <img
            src={currentWorkspace?.imgUrl ?? getCurrentWorkspaceImage()}
            className="w-[35px] h-[35px] flex-shrink-0"
          />
        </div>

        <div className="flex items-center gap-2 text-lg truncate pr-3">
          <span className="text-xl font-semibold tracking leading-tight truncate w-full">
            {currentWorkspace?.name}
          </span>
          <ChevronDown size={13} className="flex-shrink-0 mt-0.5  text-secondary" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-72 space-y-2 z-50"
        align="start"
        alignOffset={0}
        sideOffset={5}
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
              console.info('to implement');
            }}
            disabled
          >
            <QuestionCircle className="w-5 h-5 p-0.5" /> Support
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-4 h-9 px-3 hover:bg-card-foreground"
            onClick={() => {
              console.info('to implement');
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
});

export default CompanyDropdown;

// w-[35px] h-[35px]
