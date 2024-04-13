import UserDropdown from './UserDropdown';
import { observer } from 'mobx-react-lite';
import { Button } from '@/components/ui/Button';
import { Bell, House, Map, QuestionCircle } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import CompanyDropdown from '../sidebar/CompanyDropdown';
import { useNavigate } from 'react-router-dom';
import CurrentNode from './CurrentNode';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

const Topbar = () => {
  const { setActiveModal } = useStore('modalStore');
  const { toggleFeedOpen, isFeedOpen } = useStore('sidebarStore');
  const navigate = useNavigate();

  const showShortcutModal = () => {
    setActiveModal({ type: 'ShortcutMenu', payload: null });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {/* Left Side */}
      <div className="fixed top-2 left-2 overflow-hidden card bg-card rounded-md items-center flex p-1 px-1.5 z-50">
        <CompanyDropdown />
      </div>

      {/* Middle */}
      <div className="flex items-center justify-center gap-5  cursor-pointer prose fixed top-2 left-1/2 -translate-x-1/2 h-11 z-50">
        <CurrentNode />
      </div>

      {/* Right */}

      <div className="fixed right-2 top-2 overflow-hidden min-w-[2.25rem] card bg-card rounded-md  items-center flex gap-2 p-1 px-1.5 z-50">
        <Button
          onClick={() => handleNavigate('/app/home')}
          variant="ghost"
          className="w-10 h-10 p-0 hover:bg-hover card rounded-md"
        >
          <House size={18} />
        </Button>
        <Button
          onClick={() => handleNavigate('/app/nodemap')}
          variant="ghost"
          className="w-10 h-10 p-0 hover:bg-hover card rounded-md"
        >
          <Map size={17} />
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={`w-10 h-10 p-0 hover:bg-hover card rounded-md ${
                isFeedOpen ? 'bg-primary-transparent' : ''
              }`}
              onClick={() => toggleFeedOpen()}
            >
              <Bell size={19} />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>Feed</TooltipContent>
        </Tooltip>
        <Button
          variant="ghost"
          className="w-10 h-10 p-0 hover:bg-hover card rounded-md"
          onClick={showShortcutModal}
        >
          <QuestionCircle size={19} />
        </Button>

        <UserDropdown />
      </div>
    </>
  );
};

export default observer(Topbar);
