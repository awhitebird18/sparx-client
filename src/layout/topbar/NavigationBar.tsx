import UserDropdown from './UserDropdown';
import { Button } from '@/components/ui/Button';
import {
  Bell,
  BellFill,
  ChatSquareDots,
  ChatSquareDotsFill,
  CheckSquare,
  CheckSquareFill,
  FileText,
  FileTextFill,
  People,
  PeopleFill,
  Stack,
  StarFill,
  X,
  Star,
} from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import Logo from '@/components/logo/Logo';
import { observer } from 'mobx-react-lite';

const NavigationBar = observer(() => {
  const { toggleSidePanelComponent, sidePanelComponent, closeSidePanelComponent } =
    useStore('sidePanelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { currentProfileUserId } = useStore('userStore');

  return (
    <div
      className={`top-2 right-2 p-1 ${
        sidePanelComponent ? 'w-1/3 4xl:w-1/4' : 'w-fit'
      }  absolute z-30 overflow-hidden card bg-slate-500/10 backdrop-blur-lg  rounded-md shadow-md justify-end items-center gap-2 flex p-1 px-1.5 border border-border`}
    >
      {sidePanelComponent ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 w-10 p-0 mr-auto"
              size="icon"
              onClick={closeSidePanelComponent}
            >
              <X size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>Close</TooltipContent>
        </Tooltip>
      ) : null}

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={sidePanelComponent?.type === 'assistant' ? 'outline-primary' : 'ghost'}
            className="h-10 w-10"
            size="icon"
            onClick={() => toggleSidePanelComponent({ type: 'assistant' })}
          >
            <Logo size={7} />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>AI Assistant</TooltipContent>
      </Tooltip>

      <div className=" w-px bg-border card h-4" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={sidePanelComponent?.type === 'notes' ? 'outline-primary' : 'ghost'}
            className="h-10 w-10"
            size="icon"
            onClick={() => toggleSidePanelComponent({ type: 'notes' })}
          >
            {sidePanelComponent?.type === 'notes' ? (
              <FileTextFill className="text-primary-light" />
            ) : (
              <FileText className="text-secondary" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>Notes</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={sidePanelComponent?.type === 'flashcards' ? 'outline-primary' : 'ghost'}
            className="h-10 w-10"
            size="icon"
            onClick={() => toggleSidePanelComponent({ type: 'flashcards' })}
          >
            <Stack
              className={
                sidePanelComponent?.type === 'flashcards' ? 'text-primary-light' : 'text-secondary'
              }
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}></TooltipContent>
      </Tooltip>

      <div className=" w-px bg-border card h-4" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={sidePanelComponent?.type === 'stats' ? 'outline-primary' : 'ghost'}
            className="h-10 w-10"
            size="icon"
            onClick={() => toggleSidePanelComponent({ type: 'stats' })}
          >
            {sidePanelComponent?.type === 'stats' ? (
              <StarFill />
            ) : (
              <Star className="text-secondary" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>Flashcards</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={sidePanelComponent?.type === 'tasks' ? 'outline-primary' : 'ghost'}
            className="h-10 w-10"
            size="icon"
            onClick={() => toggleSidePanelComponent({ type: 'tasks' })}
          >
            {sidePanelComponent?.type === 'tasks' ? (
              <CheckSquareFill />
            ) : (
              <CheckSquare className="text-secondary" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>Tasks</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={sidePanelComponent?.type === 'users' ? 'outline-primary' : 'ghost'}
            className="h-10 w-10"
            size="icon"
            onClick={() => toggleSidePanelComponent({ type: 'users' })}
          >
            {sidePanelComponent?.type === 'users' ? (
              <PeopleFill size={19} className="text-primary-light" />
            ) : (
              <People size={19} className="text-secondary" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>Users</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={sidePanelComponent?.type === 'activity' ? 'outline-primary' : 'ghost'}
            className="h-10 w-10"
            size="icon"
            onClick={() =>
              toggleSidePanelComponent({
                type: 'activity',
                payload: {
                  endpoint: currentProfileUserId
                    ? `activity/user/${currentWorkspaceId}/${currentProfileUserId}`
                    : `/activity/workspace/${currentWorkspaceId}`,
                },
              })
            }
          >
            {sidePanelComponent?.type === 'activity' ? (
              <BellFill size={19} className="text-primary-light" />
            ) : (
              <Bell size={19} className="text-secondary" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>Activity</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={sidePanelComponent?.type === 'discussions' ? 'outline-primary' : 'ghost'}
            className="h-10 w-10"
            size="icon"
            onClick={() => toggleSidePanelComponent({ type: 'discussions' })}
          >
            {sidePanelComponent?.type === 'discussions' ? (
              <ChatSquareDotsFill className="text-primary-light" />
            ) : (
              <ChatSquareDots className="text-secondary" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>Discussions</TooltipContent>
      </Tooltip>

      <UserDropdown />
    </div>
  );
});

export default NavigationBar;
